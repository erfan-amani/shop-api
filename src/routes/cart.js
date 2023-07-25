const cartRouter = require("express").Router();
const cartController = require("../controllers/cart");
const sessionMiddleware = require("../middleware/session.middleware");

cartRouter.post("/", sessionMiddleware, cartController.addToCart);
cartRouter.delete(
  "/:productId",
  sessionMiddleware,
  cartController.removeFromCart
);

module.exports = cartRouter;
