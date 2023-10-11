const mongoose = require('mongoose');

// MongoDB Atlas connection string
const uri = "mongodb+srv://Knowmadic:Reva%40369@cluster0.h9o9mq6.mongodb.net/";

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
