const Cart = require("../models/cart");

module.exports.addToCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.user._id;

    const existedCart = await Cart.findOne({
      product: productId,
      user: userId,
    });

    if (!!existedCart?.count) {
      existedCart.count = existedCart.count + 1;

      await existedCart.save();
      res.send(existedCart);
    } else {
      console.log("hereeee");
      console.log({ productId, userId });
      const cart = new Cart({ product: productId, user: userId, count: 1 });

      await cart.save();
      res.status(201).send(cart);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.removeFromCart = async (req, res, next) => {
  try {
    const clearAll = false;
    const productId = req.params.productId;
    const userId = req.user._id;

    if (clearAll) {
      await Cart.deleteOne({ product: productId, userId });
    } else {
      const cart = await Cart.findOne({
        product: productId,
        user: userId,
      });

      if (cart.count === 1) {
        await cart.deleteOne();
      } else {
        cart.count = cart.count - 1;
        await cart.save();
      }

      res.status(200).send(cart);
    }
  } catch (error) {
    next(error);
  }
};
