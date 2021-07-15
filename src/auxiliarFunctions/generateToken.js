const jwt = require('jsonwebtoken');
const secret = require('./secretKey');

const createToken = (data) => {
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(data, secret, jwtConfig);

  return token;
};

module.exports = createToken;