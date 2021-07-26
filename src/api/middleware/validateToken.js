const jwt = require('jsonwebtoken');

const { UNAUTHORIZED } = require('./httpStatus');
const Model = require('../models/UserModel');

const SECRET = 'meusegredosupersecreto';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    
    const user = await Model.findByEmail(payload.data.email);
    const { password: _, _id: userId, ...userData } = user;
    
    console.log('user');
    req.user = { userId, ...userData };
    next();
  } catch (error) {
    return next({ status: UNAUTHORIZED, message: error.message });
  }
};

module.exports = validateToken;