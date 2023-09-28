const app = require('./app');
const { connectToDatabase } = require('./config/database');

const PORT = process.env.PORT || 1600;
console.log('process.env.PORT: ', process.env.PORT);

// Connect to the database
connectToDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});