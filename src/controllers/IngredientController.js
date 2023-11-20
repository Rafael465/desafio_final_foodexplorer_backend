const knex = require("../database/knex");

class IngredientController {
    async index(request, response) {
        
        const { food_id } = request.params;

        const ingredient = await knex("ingredient")
        .where({ food_id })
        
        return response.json(ingredient);
    }
}

module.exports = IngredientController;