const jwt = require('jsonwebtoken');
const usersModel = require('../model/users');

const SECRET = 'MaxSecret';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, SECRET);
    const user = await usersModel.findUserByEmail(payload.email);
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(401).json({ message: 'jwt malformed' });
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed', err });
  }
};

module.exports = validateToken;
