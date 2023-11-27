// Actions related to product operations
export const actions = {
  GET_PRODUCTS: "GET_PRODUCTS",                // Action for fetching products
  GET_PRODUCTS_FAILED: "GET_PRODUCTS_FAILED",  // Action when product fetching fails
  GET_CHAT: "GET_CHAT",                        // Action for getting chat details
  GET_CHAT_FAILED: "GET_CHAT_FAILED",          // Action when fetching chat details fails
};

// Authentication actions
export const auth = {
  LOGIN_REQUEST: "LOGIN_REQUEST",              // Action to request login
  LOGIN_FAILURE: "LOGIN_FAILURE",              // Action when login fails
  LOGIN_SUCCESS: "LOGIN_SUCCESS",              // Action when login is successful
  LOGOUT_REQUEST: "LOGOUT_REQUEST",            // Action to request logout
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",            // Action when logout is successful
  LOGOUT_FAILURE: "LOGOUT_FAILURE",            // Action when logout fails

  SIGNUP_REQUEST: "SIGNUP_REQUEST",            // Action to request signup
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",            // Action when signup is successful
  SIGNUP_FAILURE: "SIGNUP_FAILURE",            // Action when signup fails
};

// Cart related actions
export const cart = {
  ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",          // Action to request adding item to cart
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",          // Action when item is added to cart successfully
  ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",          // Action when adding item to cart fails
  RESET_CART: "RESET_CART",                            // Action to reset the cart
  REMOVE_CART_ITEM_REQUEST: "REMOVE_CART_ITEM_REQUEST", // Action to request removal of item from cart
  REMOVE_CART_ITEM_SUCCESS: "REMOVE_CART_ITEM_SUCCESS", // Action when item is removed from cart successfully
  REMOVE_CART_ITEM_FAILURE: "REMOVE_CART_ITEM_FAILURE", // Action when removal of item from cart fails
};

// Order related actions
export const order = {
  ADD_TO_ORDER_REQUEST: "ADD_TO_ORDER_REQUEST",        // Action to request adding item to order
  ADD_TO_ORDER_SUCCESS: "ADD_TO_ORDER_SUCCESS",        // Action when item is added to order successfully
  ADD_TO_ORDER_FAILURE: "ADD_TO_ORDER_FAILURE",        // Action when adding item to order fails
  RESET_ORDER: "RESET_ORDER",                          // Action to reset the order
  REMOVE_ORDER_ITEM_REQUEST: "REMOVE_ORDER_ITEM_REQUEST", // Action to request removal of item from order
  REMOVE_ORDER_ITEM_SUCCESS: "REMOVE_ORDER_ITEM_SUCCESS", // Action when item is removed from order successfully
  REMOVE_ORDER_ITEM_FAILURE: "REMOVE_ORDER_ITEM_FAILURE", // Action when removal of item from order fails
};
