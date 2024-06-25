const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model");

// Middleware function for JWT authentication
const authenticateToken = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, "boilerplate-authorizeuser", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized - Invalid token.' });
    }
    if (decoded.user) {
      // Token is valid
      req.auth = decoded; // You can store the decoded user information for later use
    }
  });
  return await authorizeuser(req, res, next)
  // Continue to the next middleware or route handler
}

// Middleware for user authentication
const authorizeuser = async (req, res, next) => {
  // console.log('body/payload: ', req.body);
  const user = await UserModel.findById(req.auth.user._id);
  if (!user || user.isDeleted) {
    return res.status(403).json({ message: 'user account associated with this request has been deleted. Please contact our support team' });
  }
  if (!user.isActive) {
    return res.status(403).json({ message: 'user account has been deactivated. Please contact our support team' });
  }
  next()
}

// Middleware for Role-Based Access Control (RBAC)
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.auth.user.role)) {
      return res.sendStatus(403).json({ message: "Access Denied!" });
    }
    next();
  }
}

module.exports = { authenticateToken, authorizeRole };