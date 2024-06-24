const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

// Connect to the database
const connectToDatabase = async () => {
  try {
    mongoose.connect(process.env.DB);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = {
  connectToDatabase,
};