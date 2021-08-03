const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const secret = 'mySecretKey';
  const token = jwt.sign(user, secret, jwtConfig);
  return { result: { token }, code: 200 };
};

module.exports = { createToken };