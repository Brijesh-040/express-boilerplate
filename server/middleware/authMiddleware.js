const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model");

// Middleware function for JWT authentication
function authenticateToken(req, res, next) {
  // Get the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  // Verify the token
  jwt.verify(token, "boilerplate-authorizeuser", async (err, decoded) => {
    console.log('decoded: ', decoded);
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    if(decoded.user) {
      const user = await UserModel.findById(decoded.user._id);
      if(!user) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      // Token is valid
      req.auth = decoded; // You can store the decoded user information for later use
      next(); // Continue to the next middleware or route handler
    }
  });
}

module.exports = authenticateToken;