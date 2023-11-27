const jwt = require("jsonwebtoken");

// Exporting middleware functions for use in routes
exports.middlewares = {

  // Middleware to check if the user is signed in
  requireSignin: (req, _, next) => {
    // Extracting the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // If token exists, verify it and attach user details to the request object
    if (token) {
      const _user = jwt.verify(token, process.env.NEXTGENSTORE_SECRET);
      req.user = _user;
    }

    // Proceed to the next middleware
    next();
  },

  // Middleware to check if the user has a 'user' role
  userMiddleware: (req, res, next) => {
    // If user role is not 'user', respond with an access denied message
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }

    // Proceed to the next middleware if the role is 'user'
    next();
  },
};