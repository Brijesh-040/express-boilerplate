function isAuthenticated(req, res, next) {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
      return next();
    }
  
    // Handle unauthorized access
    res.status(401).json({ message: 'Unauthorized' });
  }
  
  module.exports = {
    isAuthenticated,
  };