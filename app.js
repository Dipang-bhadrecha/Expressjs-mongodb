const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectToDatabase = require('./database/db')// Import the database connection function

// Middleware to parse JSON requests
app.use(express.json());

connectToDatabase();

// Define your routes and controllers here


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
