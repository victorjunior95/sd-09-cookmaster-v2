const jwt = require('jsonwebtoken');

const jwtConfig = {
  expireIN: '7d',
  algorithm: 'HS256',
};

const token = jwt.sign({ data: user }, secret, jwtConfig);

res.status().json({ token });

module.exports = login;
