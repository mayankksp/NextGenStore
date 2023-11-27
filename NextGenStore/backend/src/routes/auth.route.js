// Import required modules
const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const { middlewares } = require("../middlewares/middlewares");

// Initialize express router
const router = express.Router();

// Route for user signup
router.post("/signup", signup);

// Route for user signin
router.post("/signin", signin);

// Protected route for user profile
// Requires user to be signed in
router.post("/profile", middlewares.requireSignin, (_, res) => {
  res.status(200).json({ message: "User profile." });
});

// Export the router for use in other modules
module.exports = router;

/* 
  Pseudo Code: SIGNIN Process
  - If user attempts to sign in
  - Make API call to retrieve user data
  - If user is found
    - Assign user data to variables
    - Redirect user to home page
  - Else
    - Log that user is not registered
  - End If
  Else
    - Log bad login attempt
    - Show error message
    - Clear login form
  End If
*/

/* 
  Pseudo Code: SIGNUP Process
  - If user attempts to sign up
  - Make API call to retrieve user data
  - If user is not found
    - Save user to database
    - Redirect user to home page
  - Else
    - Log that user is already registered
  - End If
  Else
    - Log bad signup attempt
    - Show error message
    - Clear signup form
  End If
*/

/* 
  Pseudo Code: ORDER Process
  - If order is initiated
    - If user is signed in
      - Make API call to retrieve user data
      - Route user to cart
      - Confirm order and route to payment
      - If payment is successful
        - Place order
        - Save order to database
        - Redirect user to orders page
      - Else
        - Log payment failure
      - End If
    - Else
      - Log that user is not registered
      - Redirect to login page
    - End If
  - End If
*/

/* 
  Pseudo Code: CHATBOT Interaction
  - If message is received
    - Make API call to chatbot
    - Chatbot AI processes the message and sends response
    - Display chatbot response to user
  - End If
*/