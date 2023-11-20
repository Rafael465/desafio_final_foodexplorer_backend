const knex = require("../database/knex");

class FoodsController {
    async create(request, response) {
        const { title, image, price, type, description, ingredient } = request.body;

        const [food_id] = await knex("foods").insert({
            title,
            image,
            price,
            type,
            description
        });

        const ingredientInsert = ingredient.map(name => {
            return {
                food_id,
                name
            }
        });

        await knex("ingredient").insert(ingredientInsert);

        return response.json();
    }

    async show(request, response) {
        const { id } = request.params;

        const food = await knex("foods").where({ id }).first();
        const ingredient = await knex("ingredient").where({ food_id: id}).orderBy("name");

        return response.json({
            ...food,
            ingredient
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("foods").where({ id }).delete();        

        return response.json();
    }

    async index(request, response) {
        const { title, ingredient } = request.query;

        let foods;

        if(ingredient){
            const filterIngredient = ingredient.split(',').map(ingredient => ingredient.trim());

            foods = await knex("ingredient")
                .select([
                    "foods.id",
                    "foods.title",
                ])
                .whereLike("foods.title", `%${title}%`)
                .whereIn("name", filterIngredient)
                .innerJoin("foods", "foods.id", "ingredient.food_id")
                .orderBy("foods.title")

        } else {
            foods =  await knex("foods")
                .whereLike("title", `%${title}%`)
                .orderBy("title");    
        }

        const allIngredient = await knex("ingredient");
        const foodsWithIngredient = foods.map(food => {
            const foodIngredient = allIngredient.filter(ingredient => ingredient.food_id === food.id);

            return {
                ...food,
                ingredient: foodIngredient
            }
        });

        
        return response.json(foodsWithIngredient);
    }

    
}

module.exports = FoodsController;