import axios from "axios";
import { actions } from "../keys";

/**
 * Retrieves a message response from the chatbot API
 * @param {string} msg - The message to send to the chatbot
 */
const getMessage = (msg) => async (dispatch) => {
  try {
    // Making a POST request to the chatbot API with the provided message
    const res = await axios.post(`${process.env.REACT_APP_CHATBOT_API}/${msg}`);

    // If response is successful, dispatch the received chat message
    if (res) {
      return dispatch({
        type: actions.GET_CHAT,
        payload: res.data.message,
      });
    }
  } catch (error) {
    // Logging error in case the request fails
    console.error("Failed to get chat message:", error);

    // Dispatching failure action with the error message
    return dispatch({
      type: actions.GET_CHAT_FAILED,
      payload: error.message,
    });
  }
};

export { getMessage };