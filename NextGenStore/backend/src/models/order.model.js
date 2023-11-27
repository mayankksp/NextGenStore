const mongoose = require("mongoose");

// Define the schema for the 'order' document
const orderSchema = new mongoose.Schema(
  {
    // Link to the user who placed the order
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    // Array of items ordered
    orderedItems: [
      {
        orderId: { 
          type: String, 
          required: true, 
          ref: "Order" 
        },
        product: {
          type: Array,
          ref: "Product",
          required: true,
        },
        // Timestamp for when the item was ordered
        timeStamp: { 
          type: String, 
          required: true, 
          ref: "TimeStamp" 
        },
      },
    ],
  },
  // Enable automatic timestamping for document creation and updates
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("orders", orderSchema);