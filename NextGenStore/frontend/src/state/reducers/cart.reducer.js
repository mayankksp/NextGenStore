import { cart } from "../keys";

// Initial state of the cart
const initState = {
  cartItems: {}, // Stores cart items with item details
  updatingCart: false, // Flag to indicate if the cart is being updated
  error: null, // Stores any error that might occur during cart operations
};

// Reducer function for cart operations
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case cart.ADD_TO_CART_REQUEST:
      // Handling the case when an add to cart request is made
      return {
        ...state,
        updatingCart: true, // Set updatingCart to true to indicate loading state
      };
    case cart.ADD_TO_CART_SUCCESS:
      // Handling the case when items are successfully added to the cart
      return {
        ...state,
        cartItems: action.payload.cartItems, // Update cartItems with the new items
        updatingCart: false, // Set updatingCart to false as update is complete
      };
    case cart.ADD_TO_CART_FAILURE:
      // Handling errors during add to cart operation
      return {
        ...state,
        updatingCart: false, // Set updatingCart to false as update attempt has finished
        error: action.payload.error, // Store the received error
      };
    case cart.RESET_CART:
      // Handling cart reset
      return {
        ...initState, // Reset state to initial state
      };
    default:
      // Return current state if action type is not matched
      return state;
  }
};