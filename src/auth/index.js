const jwt = require('jsonwebtoken');
 
const secret = 'segredoBraboEImpossivelDeDesvendar';

const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign(data, secret, jwtConfig);

const validateToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

module.exports = {
  generateToken,
  validateToken,
};
