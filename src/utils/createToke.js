const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const secret = 'asdDAIK1256HBCA82';

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const joiError = ({ status, message }) => {
  const errJoi = Error(message);
  errJoi.status = status;
  throw errJoi;
};

module.exports = { 
  createToken,
  joiError,
  secret,
};