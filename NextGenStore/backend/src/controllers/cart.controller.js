const Cart = require("../models/cart.model.js");

// Helper function to run update operations on the Cart model
function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
}

// Controller to add an item to the cart
exports.addItemToCart = (req, res) => {
  // Find the cart for the current user
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });

    if (cart) {
      // If cart exists, update the cart with new or existing items
      let promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => c.product == product);
        let condition, update;

        if (item) {
          // If item exists in the cart, update its quantity
          condition = { user: req.user._id, "cartItems.product": product };
          update = { $set: { "cartItems.$": cartItem } };
        } else {
          // If item does not exist in the cart, add it
          condition = { user: req.user._id };
          update = { $push: { cartItems: cartItem } };
        }
        promiseArray.push(runUpdate(condition, update));
      });

      // Execute all update promises
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      // If cart does not exist, create a new cart for the user
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

// Controller to get the items in the cart
exports.getCartItems = (req, res) => {
  const userId = req.user?._id;

  if (userId) {
    Cart.findOne({ user: userId })
      .exec((error, cart) => {
        if (error) return res.status(400).json({ error });

        if (cart) {
          let cartItems = {};

          cart.cartItems.forEach(({ product, quantity }) => {
            cartItems[product._id.toString()] = { ...product, qty: quantity };
          });

          res.status(200).json({ cartItems });
        } else {
          return res.status(200).json({ cartItems: {} });
        }
      });
  } else {
    return res.status(200).json({ cartItems: {} });
  }
};

// Controller to remove items from the cart
exports.removeCartItems = (req, res) => {
  const productId = req.body.payload;

  if (productId) {
    Cart.updateOne(
      { user: req.user._id },
      { $pull: { cartItems: { "product._id": productId } } }
    ).exec((error, result) => {
      if (error) {
        return res.status(400).json({ message: "Invalid operation for database" });
      }
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};