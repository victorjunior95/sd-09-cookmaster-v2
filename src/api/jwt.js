const jwt = require('jsonwebtoken');

const SECRET = 'MySecretPassword';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = {
  createToken,
  verifyToken,
};
