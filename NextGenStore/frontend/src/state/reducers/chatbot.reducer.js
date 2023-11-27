// Importing the necessary actions from the keys file.
import { actions } from "../keys";

// Reducer function for handling state changes based on dispatched actions.
export const reducer = (state = { message: "" }, action) => {
  // Switch statement to handle different types of actions.
  switch (action.type) {
    // Handling the GET_CHAT action.
    case actions.GET_CHAT:
      // Logging the received message payload for debugging purposes.
      console.log("Received message from GET_CHAT action: ", action.payload);
      // Updating the state with the new message.
      return { message: action.payload };

    // Handling the GET_CHAT_FAILED action.
    case actions.GET_CHAT_FAILED:
      // Logging the error message payload for debugging purposes.
      console.log("Error in GET_CHAT action: ", action.payload);
      // Updating the state with the error message.
      return { message: action.payload };

    // Default case to handle any other actions that are not specified.
    default:
      // Returning the current state if the action type does not match.
      return state;
  }
};