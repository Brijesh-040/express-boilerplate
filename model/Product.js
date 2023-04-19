const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  image: String,
  details: String,
  firstname: String,
  lastname: String,
  mobileno: String,
  address: String,
  create:Number
});

module.exports = mongoose.model("Product", productSchema);
