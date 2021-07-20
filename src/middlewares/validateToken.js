const jwt = require('jsonwebtoken');

// const { findUser } = require('../models/loginModel');

const secret = 'senhadanasa';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  try {
    const payload = jwt.verify(token, secret);
    console.log('[payload] > ', payload);

    req.user = payload;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateToken };
