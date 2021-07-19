const jwt = require('jsonwebtoken');
const USER = require('../models/users');

const secret = 'secret';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await USER.getUser(decoded.data);
    if (!user) {
 return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token', erro: err.message,
    });
  }
};

module.exports = validateToken;
