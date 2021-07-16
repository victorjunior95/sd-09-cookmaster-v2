const jwt = require('jsonwebtoken');

const { findUserById } = require('../models/userModel');
const { jwtMalformed } = require('../service/errorsMessages');

const secret = 'undefined';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw jwtMalformed;

  try {
    const decoded = jwt.verify(token, secret);
    const { _id: id } = decoded.data;
  
    const result = await findUserById(id);
  
    if (!result) throw jwtMalformed;

    req.body.userId = id;
  
    next();
  } catch (error) {
    throw jwtMalformed;
  }
};

module.exports = validateToken;
