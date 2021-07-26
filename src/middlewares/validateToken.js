const jwt = require('jsonwebtoken');

const { findEmail } = require('../models/usersModel');

const secret = 'senhadanasa';

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const payload = jwt.verify(token, secret);

    const user = await findEmail(payload.email);

    if (!user) {
      return res.status(401).json({ message: 'invalid user' });
    }

    req.user = payload;

    next();
  } catch (err) {
    // console.log('[token validate] > ', err.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateToken };
