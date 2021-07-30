const JWT = require('jsonwebtoken');
const { SECRET } = require('../utils/jwtUtils');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
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
