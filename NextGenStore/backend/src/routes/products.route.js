// Importing the express module
const express = require("express");

// Importing the getProducts function from the products controller
const { getProducts } = require("../controllers/products.controller");

// Creating a new router object from express
const router = express.Router();

// Route handling for GET requests to the "/products" endpoint
// This will execute the getProducts function when this route is accessed
router.get("/products", getProducts);

// Exporting the router to be used in other parts of the application
module.exports = router;