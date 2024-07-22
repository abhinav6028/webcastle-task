const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
});

const products = mongoose.model('products', productSchema);

module.exports = products;
