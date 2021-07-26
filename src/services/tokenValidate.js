const jwt = require('jsonwebtoken');
const secret = 'seusecretdetoken';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = { validateToken };

