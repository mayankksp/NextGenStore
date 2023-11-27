// Import necessary modules
const express = require("express");
require("dotenv").config();  // Load environment variables
require("./src/database/index.db");  // Connect to the database
const authRouter = require("./src/routes/auth.route");
const productsRouter = require("./src/routes/products.route");
const cartRouter = require("./src/routes/cart.route");
const orderRouter = require("./src/routes/order.route");
const cors = require("cors");

// Initialize Express application
const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Define the port from environment variable or default to 8080
const port = process.env.PORT || 8080;

// Route for the root path
app.get("/", (_, res) => {
  res.status(200).send("Server running at port: " + port);
});

// Route to handle POST request at /data
app.post("/data", (req, res) => {
  const { name } = req.body;
  res.status(200).json({
    message: "Posted successfully",
    name,
  });
});

// Route registration for different modules
app.use("/api", authRouter);         // Authentication routes
app.use("/api", productsRouter);     // Product routes
app.use("/api/cart", cartRouter);    // Cart routes
app.use("/api/order", orderRouter);  // Order routes

// Start the server
app.listen(port, () => {
  console.log("Server running at port: " + port);
});