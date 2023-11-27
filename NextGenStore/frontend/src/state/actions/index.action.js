import { getProducts } from "./products.action";
import { getMessage } from "./chatbot.action";
import { isUserLoggedIn, signin, signout, signup } from "./auth.action";
import {
  getCartItems,
  addToCart,
  removeCartItem,
  updateCart,
} from "./cart.action";
import {
  getOrders,
  addToOrders,
  removeOrder,
  updateOrder,
} from "./order.action";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

// Consolidating all action creators
const actionCreators = {
  getProducts,
  getMessage,
  isUserLoggedIn,
  signin,
  signout,
  signup,
  getCartItems,
  addToCart,
  updateCart,
  removeCartItem,
  getOrders,
  addToOrders,
  removeOrder,
  updateOrder,
};

/**
 * Custom hook to use the action creators with dispatch
 * @returns Bound action creators to the Redux dispatch function
 */
export const useAction = () => {
  return bindActionCreators(actionCreators, useDispatch());
};