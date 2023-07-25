const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  count: { type: Number, required: true },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
