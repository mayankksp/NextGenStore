import axios from "../../utils/helper";
import makeId from "../../utils/logic";
import { order as orderKeys } from "../keys";
import { store } from "../store.state";

/**
 * Retrieves orders from the server
 */
export const getOrders = () => {
  return async (dispatch) => {
    try {
      // Dispatching action to indicate order retrieval request
      dispatch({ type: orderKeys.ADD_TO_ORDER_REQUEST });

      // Making a POST request to get orders
      const res = await axios.post(`/order/get`);
      if (res.status === 200) {
        const { orderedItems } = res.data;
        
        // If orders are found, dispatch success action
        if (orderedItems) {
          dispatch({
            type: orderKeys.ADD_TO_ORDER_SUCCESS,
            payload: { orderedItems },
          });
        }
      }
    } catch (error) {
      // Logging any error responses
      console.error("Error fetching orders:", error.response);
    }
  };
};

/**
 * Adds a product to orders
 * @param {Object} product - Product to be added to orders
 */
export const addToOrders = (product) => {
  return async (dispatch) => {
    // Getting current state of orders and authentication
    const {
      orders: { orderedItems },
      auth,
    } = store.getState();

    if (auth.authenticated) {
      // Dispatching action to indicate adding to order request
      dispatch({ type: orderKeys.ADD_TO_ORDER_REQUEST });

      const payload = {
        orderedItems: [
          {
            orderId: makeId(),
            product: product,
            timeStamp: new Date().toISOString(),
          },
        ],
      };

      try {
        const res = await axios.post(`/order/add`, payload);
        if (res.status === 201) {
          // On successful addition, fetch updated orders
          dispatch(getOrders());
        }
      } catch (err) {
        // Logging any error responses
        console.error("Error adding to orders:", err.response);
      }
    }

    // Dispatching action to add product to orders
    dispatch({
      type: orderKeys.ADD_TO_ORDER_SUCCESS,
      payload: { orderedItems },
    });
  };
};

/**
 * Removes an order item
 * @param {Object} payload - Information about the item to remove
 */
export const removeOrder = (payload) => {
  return async (dispatch) => {
    try {
      // Dispatching request action for removing order item
      dispatch({ type: orderKeys.REMOVE_ORDER_ITEM_REQUEST });

      const res = await axios.post(`/order/remove`, { payload });
      if (res.status === 202) {
        // If removal is successful, dispatch success action and update orders
        dispatch({ type: orderKeys.REMOVE_ORDER_ITEM_SUCCESS });
        dispatch(getOrders());
      } else {
        // Handle failure case
        const { error } = res.data;
        dispatch({
          type: orderKeys.REMOVE_ORDER_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      // Logging any error responses
      console.error("Error removing order item:", error.response);
    }
  };
};

/**
 * Updates an order (currently not implemented)
 */
export const updateOrder = () => {
  return; // Functionality not implemented yet
};