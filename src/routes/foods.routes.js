const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const FoodsController = require("../controllers/FoodsController");
const FoodImageController = require("../controllers/FoodImageController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const verifyUserAuthorization = require("../middleware/verifyUserAuthorization");

const foodsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const foodsController = new FoodsController();
const foodImageController = new FoodImageController();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.post("/", verifyUserAuthorization("admin"), foodsController.create);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.delete("/:id", verifyUserAuthorization("admin"), foodsController.delete);

foodsRoutes.patch("/:id", ensureAuthenticated, upload.single("image"), foodImageController.update);

module.exports = foodsRoutes;