const mongoose = require('mongoose');

// Connect to the database
const connectToDatabase = async () => {
  try {
    mongoose.connect('mongodb://localhost/expres', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = {
  connectToDatabase,
};