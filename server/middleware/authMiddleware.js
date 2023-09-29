const jwt = require('jsonwebtoken');

// Middleware function for JWT authentication
function authenticateToken(req, res, next) {
  // Get the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  // Verify the token
  jwt.verify(token, "b-mart-authorizeuser", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid decod token' });
    }

    // Token is valid
    req.auth = decoded; // You can store the decoded user information for later use
    next(); // Continue to the next middleware or route handler
  });
}

module.exports = authenticateToken;