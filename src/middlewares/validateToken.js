const jwt = require('jsonwebtoken');

const { jwtMalformed, missingToken } = require('../service/errorsMessages');

const secret = 'undefined';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw missingToken;

  try {
    const decoded = jwt.verify(token, secret);
    const user = decoded.data;
    req.user = user;
  
    next();
  } catch (error) {
    throw jwtMalformed;
  }
};

module.exports = validateToken;
