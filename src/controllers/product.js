const Product = require("../models/product");

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.send(products);
  } catch (error) {
    next(error);
  }
};

module.exports.getOneProducts = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    res.send(product);
  } catch (error) {
    next(error);
  }
};
