const { Router } = require("express");

const usersRoutes = require("./users.routes");
const foodsRoutes = require("./foods.routes");
const ingredientRoutes = require("./ingredient.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/foods", foodsRoutes);
routes.use("/ingredient", ingredientRoutes);


module.exports = routes;