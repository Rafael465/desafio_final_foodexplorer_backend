const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const UsersValidatedController = require("../controllers/UsersValidatedController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;