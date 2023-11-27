// Load environment variables from a .env file
require('dotenv').config();

// Importing mongoose for database operations
const mongoose = require('mongoose');

// Importing the Product model (update the path as needed)
const Product = require('./src/models/product.model.js'); 

// Import database connection module (update the path as needed)
const { db } = require('./src/database/index.db');

// Loading products data from a JSON file (ensure the path is correct)
const productsData = require('./products.json');

// Async function to add products to the database
async function addProducts() {
  try {
    // Wait for the database connection to establish
    await db;

    // Iterating over each product data item
    for (const productData of productsData) {
      // Creating a new product instance
      const product = new Product(productData);
      // Saving the product to the database
      await product.save();
    }

    // Log message upon successful addition of products
    console.log('All products have been successfully added to the database.');
  } catch (error) {
    // Log any errors that occur during the process
    console.error('An error occurred while adding products:', error);
  } finally {
    // Close the database connection once the process is complete
    mongoose.disconnect();
  }
}

// Execute the addProducts function
addProducts();