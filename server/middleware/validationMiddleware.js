function validateUser(req, res, next) {
    // Validate user input
    // ...
  
    if (validatehere) { //validation condition here
      res.status(400).json({ message: 'Validation failed' });
    } else {
      next();
    }
  }
  
  module.exports = {
    validateUser,
  };