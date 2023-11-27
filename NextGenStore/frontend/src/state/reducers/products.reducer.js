import { actions } from "../keys";

/**
 * Reducer for managing products state
 * @param {Object} state - The current state of the reducer. Initialized with an empty products object.
 * @param {Object} action - The dispatched action containing the type and payload.
 * @returns The updated state based on the action type.
 */
export const reducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS:
      // Updates the state with the fetched products
      return { products: action.payload };
    case actions.GET_PRODUCTS_FAILED:
      // Updates the state with an empty object or error message if fetching products fails
      return { products: action.payload };
    default:
      // Returns the current state for unrecognized actions
      return state;
  }
};