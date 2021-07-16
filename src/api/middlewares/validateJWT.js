const jwt = require('jsonwebtoken');

const secret = 'segredo';

module.exports = async (req, res, next) => {

};

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const token = jwt.sign({ data: user }, secret, jwtConfig);
