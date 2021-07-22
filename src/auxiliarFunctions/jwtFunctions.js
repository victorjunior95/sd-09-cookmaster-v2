const jwt = require('jsonwebtoken');

const config = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = 'segredoQualquerSoProProjetoFuncionar';

const newToken = (payload) => jwt.sign(payload, secret, config);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  newToken,
  verifyToken,
};
