require('dotenv').config();

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

exports.cookieJwtAuth = (req, res, next) => {
  // Retrieve token
  const token = req.cookies.token;
  try {
    // Compare with secret key to verify jwt and return decoded token
    jwt.verify(token, SECRET);
    // Call the next route
    next();
  } catch (error) {
    // Clear the token cookie
    res.clearCookie('token');
    // Return unauthorized response
    return res.status(401).json({error: 'Unauthorized.'});
  }
};