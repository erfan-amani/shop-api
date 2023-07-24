const productRouter = require("express").Router();
const productController = require("../controllers/product");

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getOneProducts);

module.exports = productRouter;
