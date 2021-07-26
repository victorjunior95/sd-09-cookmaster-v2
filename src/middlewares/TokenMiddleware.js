const jwt = require('jsonwebtoken');

const JWT_SECRET = 'cookmaster';
const HTTP_UNAUTHORIZED = 401;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('missing_token');
    }
    const userData = jwt.verify(token, JWT_SECRET);
    req.user = userData;
    next();
  } catch (err) {
    if (err.message === 'missing_token') {
      return res.status(HTTP_UNAUTHORIZED).json({ message: 'missing auth token' });
    }
    return res.status(HTTP_UNAUTHORIZED).json({ message: err.message });
  }
};
