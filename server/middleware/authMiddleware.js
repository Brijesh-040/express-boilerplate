const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model");

// Middleware function for JWT authentication
const authenticateToken = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  // Verify the token
  jwt.verify(token, "boilerplate-authorizeuser", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    if (decoded.user) {
      // Token is valid
      req.auth = decoded; // You can store the decoded user information for later use
    }
  });
  return await authorizeuser(req, res, next)
  // Continue to the next middleware or route handler
}

const authorizeuser = async (req, res, next) => {
  const user = await UserModel.findById(req.auth.user._id);
  if (!user || user.isDeleted) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  if (!user.isActive) {
    return res.status(401).json({ message: 'user account has been deactivated - contact support team' });
  }
  next()
}

// Middleware to check if user is admin
function authorizeAdmin(req, res, next) {
  if (req.auth.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  next();
}

module.exports = { authenticateToken, authorizeuser, authorizeAdmin };