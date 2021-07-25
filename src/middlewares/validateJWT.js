const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const secret = 'sd-09-cookmaster-v2';

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(authorization, secret);

    const user = await Users.findByEmail(decoded.payload.email);

    if (!user) {
      return res.status(401).json({ message: 'user not found' });
    }

    req.user = decoded.payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
