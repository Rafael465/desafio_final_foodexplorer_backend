const { Router } = require("express");

const IngredientController = require("../controllers/IngredientController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const ingredientRoutes = Router();

const ingredientController = new IngredientController();


ingredientRoutes.get("/:food_id",ensureAuthenticated, ingredientController.index);

module.exports = ingredientRoutes;