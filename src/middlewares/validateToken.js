const jwt = require('jsonwebtoken');
// const { findUser } = require('../models/users');

const SECRET = 'XABLAU';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    const { _id, role } = payload.data;
    req.userId = _id;
    req.role = role;
    // console.log(payload);
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validateToken,
};