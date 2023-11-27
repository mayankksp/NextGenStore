const express = require("express");
// Importing the order controller functions
const {
  addItemToOrders,
  getOrders,
  removeOrder,
} = require("../controllers/order.controller.js");

const router = express.Router();

// Importing the requireSignin middleware
const {
  middlewares: { requireSignin },
} = require("../middlewares/middlewares");

// Route to add an item to orders
router.post("/add", requireSignin, addItemToOrders);

// Route to get orders
router.post("/get", requireSignin, getOrders);

// New update: Route to remove an order
router.post("/remove", requireSignin, removeOrder);

// Exporting the router module
module.exports = router;