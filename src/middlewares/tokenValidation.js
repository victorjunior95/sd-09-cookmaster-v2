const jwt = require('jsonwebtoken');

const secret = 'pipocin';

const validateToken = async (token) => {
  if (!token) return { error: 'jwt malformed', status: 401 };
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.data;
  } catch (err) {
    return { error: 'jwt malformed', status: 401 };
  }
};

module.exports = {
  validateToken,
};