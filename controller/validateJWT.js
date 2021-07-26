const jwt = require('jsonwebtoken');
const usersModel = require('../model/usersModel');

const secret = 'tokensecreto';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded) throw res.status(401).json({ message: 'jwt malformed' });
    const user = usersModel.findEmail(decoded.data.email);
    req.user = user;
    next();
  } catch (err) {
    return next(err);
  }
};

// jwt.verify(token, secret, (err, decoded) => {
//   if (err) return res.status(401).json({ message: 'jwt malformed' });
//   const user = usersModel.findEmail(decoded.data.email);
//   req.user = user;
// });
