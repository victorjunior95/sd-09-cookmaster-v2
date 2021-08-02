const JWT = require('jsonwebtoken');
const { SECRET } = require('../utils/jwtUtils');

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const error = new Error();
    error.statusCode = 'missingToken';
    throw error;
  }

  try {
    const payload = JWT.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (err) {
    err.statusCode = 'jwtError';
    next(err);
  }
};
