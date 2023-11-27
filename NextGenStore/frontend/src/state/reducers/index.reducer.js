import { combineReducers } from "redux";

// Importing individual reducers
import { reducer as productReducer } from "./products.reducer";
import { reducer as chatbotReducer } from "./chatbot.reducer";
import { reducer as authReducer } from "./auth.reducer";
import { reducer as cartReducer } from "./cart.reducer";
import { reducer as orderReducer } from "./order.reducer";

/**
 * Combines individual reducers into a single root reducer
 * - products: Manages state for products
 * - chatbot: Manages state for chatbot interactions
 * - auth: Manages authentication state
 * - cart: Manages shopping cart state
 * - orders: Manages orders state
 */
export const reducers = combineReducers({
  products: productReducer,
  chatbot: chatbotReducer,
  auth: authReducer,
  cart: cartReducer,
  orders: orderReducer,
});