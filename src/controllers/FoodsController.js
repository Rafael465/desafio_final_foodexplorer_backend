const knex = require("../database/knex");

class FoodsController {
    async create(request, response) {
        const { name, image, price, type, description, ingredient } = request.body;

        const [food_id] = await knex("foods").insert({
            name,
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

        response.json();
    }
}

module.exports = FoodsController;