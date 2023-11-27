const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.NEXTGENSTORE_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

// Signup controller
exports.signup = (req, res) => {
  // Check if user already exists
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        // If user exists, send a 400 response
        return res.status(400).json({
          message: "User already exists.",
        });
      }

      // Extract user details from request body
      const { firstName, lastName, email, password } = req.body;
      const _user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      // Save the new user
      _user
        .save()
        .then((user) => {
          // Generate token for the new user
          const token = generateJwtToken(user._id, user.role);
          const { _id, firstName, lastName, email, role, fullName } = user;
          // Respond with user details and token
          return res.status(200).json({
            token,
            message: "User created successfully.",
            user: { _id, firstName, lastName, email, role, fullName },
          });
        })
        .catch((_) => {
          // Handle save error
          res.status(400).json({ message: "Something went wrong." })
        });
    })
    .catch((_) => {
      // Handle find error
      res.status(400).json({
        message: "User not found.",
      })
    });
};

// Signin controller
exports.signin = (req, res) => {
  // Find user by email
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.authenticate(req.body.password) && user.role === "user") {
        // Generate a token if authentication is successful
        const token = jwt.sign({ _id: user.id }, process.env.NEXTGENSTORE_SECRET, {
          expiresIn: "1h", // Token expires in 1 hour
        });

        const { _id, firstName, lastName, role, email, fullname } = user;
        // Respond with user details and token
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            role,
            email,
            fullname,
          },
        });
      } else {
        // Handle incorrect password or username
        res.status(400).json({ message: "Invalid password or username." });
      }
    })
    .catch((_) => {
      // Handle user not found
      res.status(400).json({ message: "User not found." })
    });
};