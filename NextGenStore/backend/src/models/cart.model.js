const mongoose = require("mongoose");

// Define the schema for the cart
const cartSchema = new mongoose.Schema(
  {
    // Link each cart to a user
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    // Array of cart items
    cartItems: [
      {
        // Each item has a product object
        product: {
          type: Object,
          ref: "Product",
          required: true,
        },
        // Quantity of each product, default is 1
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true } // Enable automatic timestamps for each cart
);

// Export the cart model
module.exports = mongoose.model("carts", cartSchema);