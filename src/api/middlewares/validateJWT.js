const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');
const { unauthorized } = require('../utils/httpStatusCodes');

const secret = 'sup3rs3gr3d0';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(unauthorized).json({ message: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { email } = decoded.userData;

    const user = await userModel.getByEmail(email);

    if (!user) {
      return res.status(unauthorized).json({ message: 'jwt malformed' });
    }

    const { password: _, ...userData } = user;

    req.user = userData;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = validateJWT;
