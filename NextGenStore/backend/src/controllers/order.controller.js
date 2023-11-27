const Order = require("../models/order.model.js");

// Helper function to update the order details
function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Order.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((_) => resolve())
      .catch((err) => reject(err));
  });
}

// Controller function to add items to an order
exports.addItemToOrders = (req, res) => {
  Order.findOne({ user: req.user._id }).exec((error, order) => {
    if (error) return res.status(400).json({ error });

    if (order) {
      // If order already exists, update the order with new items
      let promiseArray = [];

      req.body.orderedItems.forEach((orderedItem) => {
        const product = orderedItem.product;
        const item = order.orderedItems.find((c) => c.product == product);
        let condition, update;

        if (item) {
          // Update existing item in the order
          condition = { user: req.user._id, "orderedItems.product": product };
          update = {
            $set: {
              "orderedItems.$": orderedItem,
            },
          };
        } else {
          // Add new item to the order
          condition = { user: req.user._id };
          update = {
            $push: {
              orderedItems: orderedItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
      });

      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      // If order does not exist, create a new order
      const order = new Order({
        user: req.user._id,
        orderedItems: req.body.orderedItems,
      });
      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          return res.status(201).json({ order });
        }
      });
    }
  });
};

// Controller function to retrieve orders for a user
exports.getOrders = (req, res) => {
  const userId = req.user?._id;
  if (userId) {
    Order.findOne({ user: userId })
      .exec((error, order) => {
        if (order) {
          res.status(200).json({ orderedItems: order.orderedItems });
        } else return res.status(200).json({ orderedItems: {} });
      });
  } else return res.status(200).json({ orderedItems: {} });
};

// Controller function to remove an order item
exports.removeOrder = (req, res) => {
  const orderId = req.body.payload;
  if (orderId) {
    Order.updateOne(
      { user: req.user._id },
      { $pull: { orderedItems: { orderId: orderId } } }
    ).exec((error, result) => {
      if (error)
        return res
          .status(400)
          .json({ message: "invalid operation for database" });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};