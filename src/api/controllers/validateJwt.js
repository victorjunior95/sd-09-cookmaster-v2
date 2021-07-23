const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const stateUnauthorized = 401;

const SECRET = 'paraguamicotirimiruaruvrawoffoline';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(stateUnauthorized).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await userModel.findEmail(decoded.email);
    const { password, ...nopass } = user;
    
    if (!user) {
      return res.status(stateUnauthorized).json({ message: 'jwt malformed' });
    }

    req.user = nopass;
    next();
  } catch (err) {
    return res.status(stateUnauthorized).json({ message: 'jwt malformed' });
  }
};
