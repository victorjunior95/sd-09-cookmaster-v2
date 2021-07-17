const jwt = require('jsonwebtoken');

const SECRET = 'MySecretPassword';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createToken = async (payload) => jwt.sign(payload, SECRET, jwtConfig);

const verifyToken = async (token) => jwt.verify(token, SECRET);

module.exports = {
  createToken,
  verifyToken,
};
