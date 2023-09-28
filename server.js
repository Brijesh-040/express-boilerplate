const app = require('./app');
const dotenv = require('dotenv')
dotenv.config()
const { connectToDatabase } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Connect to the database
connectToDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});