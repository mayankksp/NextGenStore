const mongoose = require('mongoose');

// Define the product schema for MongoDB using Mongoose
const productSchema = new mongoose.Schema({
  // 'name' field to store the product name, a string that is required
  name: { type: String, required: true },

  // 'price' field to store the product price, a number that is required
  price: { type: Number, required: true },

  // 'desc' field to store a description of the product, a string that is required
  desc: { type: String, required: true },

  // 'image' field to store the URL of the product's image, a string that is required
  image: { type: String, required: true },
});

// Create a model from the schema to interact with the 'Product' collection in the database
const Product = mongoose.model('Product', productSchema);

// Export the Product model for use in other parts of the application
module.exports = Product;