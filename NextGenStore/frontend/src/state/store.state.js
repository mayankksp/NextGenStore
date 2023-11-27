// Importing necessary functions and modules from Redux and Redux-Thunk
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers/index.reducer";

// Creating a Redux store
// - `reducers` is combined reducers from `index.reducer.js`.
// - The second argument is the initial state, here it's an empty object.
// - `applyMiddleware(thunk)` is used to enhance the store with Redux Thunk middleware.
//   This middleware allows for writing action creators that return a function instead of an action.
//   Useful for handling asynchronous operations.
export const store = createStore(reducers, {}, applyMiddleware(thunk));