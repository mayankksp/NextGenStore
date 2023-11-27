// Importing the Product model
const Product = require("../models/product.model.js");

// Controller for handling the 'getProducts' request
exports.getProducts = (req, res) => {
  // Logging to indicate the request has been received
  console.log("Ping");

  // Using the Product model to find all products in the database
  Product
    .find()
    .then((data) => {
      // Optional: Logging the fetched data for debugging purposes
      console.log(data);

      // Sending the fetched products as a response with a 200 status code
      res.status(200).json({ products: data });
    })
    .catch((error) => {
      // Logging the error if the fetching fails
      console.error('Error fetching products:', error);

      // Sending an error message with a 500 status code in case of failure
      res.status(500).json({ message: 'Error fetching products' });
    });
};