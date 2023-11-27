const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Defining the User Schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // Field is mandatory
      trim: true, // Trims whitespace
      min: 3, // Minimum length
      max: 20, // Maximum length
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures email is unique in the collection
    },
    hashPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Role can only be 'user' or 'admin'
      default: "user", // Default role
    },
    contact: String, // Optional contact field
    profilePicture: String, // Optional profile picture field
  },
  { timestamps: true } // Auto-generate createdAt and updatedAt fields
);

// Virtual field for password
userSchema.virtual("password").set(function (password) {
  this.hashPassword = bcrypt.hashSync(password, 10); // Encrypting password
});

// Virtual field for full name
userSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`; // Concatenates first and last name
});

// Methods for the User Schema
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashPassword); // Compares the encrypted password
  },
};

// Exporting the model
module.exports = mongoose.model("users", userSchema);