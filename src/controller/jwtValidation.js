const jwt = require('jsonwebtoken');
const usersModel = require('../model/user');

const secret = 'secretToken';

module.exports = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) return res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(authToken, secret);
    const user = usersModel.searchEmail(decoded.data.email);
    req.user = user;
    next();
  } catch (err) {
    if (err.message === 'invalid token' || err.message === 'jwt malformed') {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    return next(err);
  }
};