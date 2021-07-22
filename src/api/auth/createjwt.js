const JWT = require('jsonwebtoken');

const JWT_SECRET = 'oSegredoDaLinhaDoTempo';

const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

module.exports = (data) => JWT.sign(data, JWT_SECRET, jwtConfig);
