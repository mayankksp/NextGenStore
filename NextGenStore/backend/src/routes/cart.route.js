const express = require("express");

// Importing cart related controllers
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart.controller.js");

const router = express.Router();

// Importing middleware for user authentication
const {
  middlewares: { requireSignin },
} = require("../middlewares/middlewares");

// Route to add items to the cart, requires user to be signed in
router.post("/add", requireSignin, addItemToCart);

// Route to retrieve cart items, requires user to be signed in
router.post("/get", requireSignin, getCartItems);

// New update: Route to remove items from the cart, requires user to be signed in
router.post("/remove", requireSignin, removeCartItems);

// Exporting the router
module.exports = router;