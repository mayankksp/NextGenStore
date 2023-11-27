import { auth } from "../keys.js";

// Initial state of the authentication process
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticated: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

// Reducer function to handle authentication actions
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case auth.LOGIN_REQUEST:
      // When login is requested, set authenticating to true
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case auth.LOGIN_SUCCESS:
      // Handle successful login
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        message: "Login successful.",
        authenticated: true,
        authenticating: false,
      };
      break;

    case auth.LOGOUT_REQUEST:
      // When logout is requested, set loading to true
      state = {
        ...state,
        loading: true,
      };
      break;

    case auth.LOGOUT_SUCCESS:
      // Handle successful logout
      state = {
        ...initState,
        message: action?.payload?.message || "Logout successful.",
      };
      break;

    case auth.LOGIN_FAILURE:
      // Handle login failure
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;

    case auth.SIGNUP_REQUEST:
      // Placeholder for signup request
      break;

    case auth.SIGNUP_SUCCESS:
      // Placeholder for successful signup
      break;

    case auth.SIGNUP_FAILURE:
      // Handle signup failure
      state = {
        ...state,
        message: action.payload.message,
      };
      break;

    default:
      // Default case does nothing
      break;
  }

  return state;
};