const mongoose = require('mongoose');

// MongoDB Atlas connection string
const uri = "mongodb+srv://Knowmadic:Reva%40369@octoberproject.2qtbfvy.mongodb.net/?retryWrites=true&w=majority";

// Create a function to establish the database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB Atlas connection error:', error);
  }
}

module.exports = connectToDatabase;
