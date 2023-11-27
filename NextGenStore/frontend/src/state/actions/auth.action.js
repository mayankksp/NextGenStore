import { auth, cart } from "../keys";
import axios from "../../utils/helper";

/**
 * Action for signing up a user
 * @param {Object} user - User information for signup
 */
export const signup = (user) => {
  return async (dispatch) => {
    let res;
    try {
      // Dispatching signup request action
      dispatch({ type: auth.SIGNUP_REQUEST });

      // Logging user data for debugging (consider removing in production)
      console.log("Signing up user:", user);

      // Making a POST request to the signup endpoint
      res = await axios.post(`/signup`, user);

      if (res.status === 200) {
        // Dispatching signup success action
        dispatch({ type: auth.SIGNUP_SUCCESS });

        const { token, user, message } = res.data;

        // Storing token and user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Dispatching login success action after signup
        dispatch({
          type: auth.LOGIN_SUCCESS,
          payload: {
            token,
            user,
            message,
          },
        });
      } else {
        // Handling non-200 responses
        const { message } = res.data;
        dispatch({ type: auth.SIGNUP_FAILURE, payload: { message } });
      }
    } catch (error) {
      // Handling request errors
      const { message } = error.response.data;
      dispatch({
        type: auth.SIGNUP_FAILURE,
        payload: { message },
      });
    }
  };
};

/**
 * Action for signing in a user
 * @param {Object} user - User information for signin
 */
export const signin = (user) => {
  return async (dispatch) => {
    // Dispatching login request action
    dispatch({ type: auth.LOGIN_REQUEST });

    let res;
    try {
      // Making a POST request to the signin endpoint
      res = await axios.post(`/signin`, user);

      if (res.status === 200) {
        const { token, user } = res.data;

        // Storing token and user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Dispatching login success action
        dispatch({
          type: auth.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    } catch (err) {
      // Handling request errors
      dispatch({
        type: auth.LOGIN_FAILURE,
        payload: { message: err.response.data.message },
      });
    }
  };
};

/**
 * Action to check if user is already logged in
 */
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      // Dispatching login success if token exists
      dispatch({
        type: auth.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      // Dispatching login failure if token does not exist
      dispatch({
        type: auth.LOGIN_FAILURE,
        payload: { message: "Failed to signin" },
      });
    }
  };
};

/**
 * Action for signing out a user
 */
export const signout = () => {
  return async (dispatch) => {
    // Dispatching logout request action
    dispatch({ type: auth.LOGOUT_REQUEST });

    // Clearing localStorage
    localStorage.clear();

    // Dispatching logout success action
    dispatch({ type: auth.LOGOUT_SUCCESS });

    // Resetting the cart upon logout
    dispatch({ type: cart.RESET_CART });

    // Note: Consider implementing server-side signout if needed
  };
};