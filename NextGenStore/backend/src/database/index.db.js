const mongoose = require("mongoose");

// Loading environment variables for MongoDB configuration
const { MONGODB, MONGODB_ATLAS, DATABASE } = process.env;

// Building the MongoDB connection URL from the environment variables
const mongoURL = `${MONGODB}${DATABASE}`;

// Connecting to MongoDB using mongoose with configuration options
mongoose.connect(mongoURL, {
  useUnifiedTopology: true,  // This option enables the use of the new Server Discovery and Monitoring engine
  useNewUrlParser: true,     // This option enables the use of the new MongoDB driver's URL string parser
});

// Acquiring the default connection from mongoose
const db = mongoose.connection;

// Event listener for successful database connection
db.on("connected", () => {
  console.log("Database connection established successfully");
});

// Event listener for database connection errors
db.on("error", (error) => {
  console.error("Database connection failed: ", error);
});

// Exporting the database connection and the 'products' collection for external use
module.exports = { db };