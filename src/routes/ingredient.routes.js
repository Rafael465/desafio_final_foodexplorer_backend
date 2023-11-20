const { Router } = require("express");

const IngredientController = require("../controllers/IngredientController");

const ingredientRoutes = Router();

const ingredientController = new IngredientController();

ingredientRoutes.get("/:food_id", ingredientController.index);

module.exports = ingredientRoutes;