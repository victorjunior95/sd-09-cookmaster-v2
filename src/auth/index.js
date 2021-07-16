const jwt = require('jsonwebtoken');
const Errors = require('../errors');
 
const secret = 'segredoBraboEImpossivelDeDesvendar';

const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign(data, secret, jwtConfig);

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new Errors.InvalidTokenError();
  }
};

module.exports = {
  generateToken,
  validateToken,
};
