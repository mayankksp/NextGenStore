import axios from 'axios';
import { api } from './urlConfig.js';
import { store } from '../state/store.state.js';
import { auth } from '../state/keys.js';

// Retrieve token from local storage
const token = window.localStorage.getItem('token');

// Create an axios instance with the base URL and headers
const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

// Add a request interceptor to the axios instance
axiosIntance.interceptors.request.use((req) => {
  // Get the auth state from the store
  const { auth } = store.getState();
  
  // If there is a token in the auth state, update the Authorization header
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  
  // Return the modified request
  return req;
});

// Add a response interceptor to handle responses and errors
axiosIntance.interceptors.response.use(
  (res) => {
    // Return the response directly if there are no errors
    return res;
  },
  (error) => {
    // Extract the status code from the error response
    const status = error.response.status;
    
    // If there is a status code, clear local storage and dispatch logout action
    if (status) {
      localStorage.clear();
      store.dispatch({ type: auth.LOGOUT_SUCCESS });
    }
    
    // Reject the promise to handle the error in the calling function
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default axiosIntance;