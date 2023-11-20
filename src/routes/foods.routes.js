const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const FoodsController = require("../controllers/FoodsController");
const FoodImageController = require("../controllers/FoodImageController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const foodsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const foodsController = new FoodsController();
const foodImageController = new FoodImageController();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.post("/", foodsController.create);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.delete("/:id", foodsController.delete);
foodsRoutes.patch("/:id", upload.single("image"), foodImageController.create);


module.exports = foodsRoutes;