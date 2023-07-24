const Product = require("../models/product");

const initProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    });
    const data = await response.json();

    // await Product.insertMany(data);

    console.log("Init was successfull!");
  } catch (error) {
    console.log("Error in init products!");
    console.log(error);
  }
};

module.exports = initProducts;
