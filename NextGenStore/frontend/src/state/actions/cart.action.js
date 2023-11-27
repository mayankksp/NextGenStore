import axios from "../../utils/helper";
import { cart as cartKeys } from "../keys";
import { store } from "../store.state";

/**
 * Retrieves cart items from the server
 */
const getCartItems = () => {
  return async (dispatch) => {
    try {
      // Dispatching action to indicate cart items retrieval request
      dispatch({ type: cartKeys.ADD_TO_CART_REQUEST });

      // Making a POST request to get cart items
      const res = await axios.post(`/cart/get`);
      if (res.status === 200) {
        const { cartItems } = res.data;
        
        // If cart items are found, dispatch success action
        if (cartItems) {
          dispatch({
            type: cartKeys.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      // Logging any error responses
      console.log("Error fetching cart items:", error.response);
    }
  };
};

/**
 * Adds a product to the cart
 * @param {Object} product - Product to be added to cart
 * @param {number} newQty - New quantity to be added
 */
export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    // Getting current state of cart and authentication
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    // Calculating new quantity for the product
    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
    
    // Updating cart items with new product details
    cartItems[product._id] = {
      ...product,
      qty,
    };

    // If user is authenticated, update cart in server
    if (auth.authenticated) {
      dispatch({ type: cartKeys.ADD_TO_CART_REQUEST });

      const payload = {
        cartItems: [
          {
            product: product,
            quantity: qty,
          },
        ],
      };

      try {
        const res = await axios.post(`/cart/add`, payload);
        if (res.status === 201) {
          // On successful addition, fetch updated cart items
          dispatch(getCartItems());
        }
      } catch (err) {
        // Logging any error responses
        console.log("Error adding to cart:", err.response);
      }
    }

    // Dispatching action to add product to cart
    dispatch({
      type: cartKeys.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

/**
 * Removes an item from the cart
 * @param {Object} payload - Information about the item to remove
 */
export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      // Dispatching request action for removing cart item
      dispatch({ type: cartKeys.REMOVE_CART_ITEM_REQUEST });

      const res = await axios.post(`/cart/remove`, { payload });
      if (res.status === 202) {
        // If removal is successful, dispatch success action and update cart items
        dispatch({ type: cartKeys.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        // Handle failure case
        const { error } = res.data;
        dispatch({
          type: cartKeys.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      // Logging any error responses
      console.log("Error removing cart item:", error.response);
    }
  };
};

/**
 * Updates the cart (currently not implemented)
 */
export const updateCart = () => {
  return; // Functionality not implemented yet
};

export { getCartItems };