import { order } from "../keys";

// Initial state for the order reducer
const initState = {
  orderedItems: {
    // Example structure of ordered items (commented out)
    // 123: {
    //     _id: 123,
    //     name: 'Product',
    //     img: 'some.jpg',
    //     price: 200,
    //     qty: 1,
    // }
  },
  updatingOrders: false, // Represents if the orders are being updated
  error: null, // Holds error information, if any
};

/**
 * Reducer for handling order-related actions
 * @param {Object} state - Current state of the reducer
 * @param {Object} action - Action dispatched
 */
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case order.ADD_TO_ORDER_REQUEST:
      // Handling add to order request action
      state = {
        ...state,
        updatingOrders: true,
      };
      break;
    case order.ADD_TO_ORDER_SUCCESS:
      // Handling successful addition to order
      state = {
        ...state,
        orderedItems: action.payload.orderedItems,
        updatingOrders: false,
      };
      break;
    case order.ADD_TO_ORDER_FAILURE:
      // Handling failure in adding to order
      state = {
        ...state,
        updatingOrders: false,
        error: action.payload.error,
      };
      break;
    case order.RESET_ORDER:
      // Resetting the order state to initial state
      state = {
        ...initState,
      };
      break;
    default:
      // Returning current state for unrecognized actions
      return state;
  }
  return state;
};