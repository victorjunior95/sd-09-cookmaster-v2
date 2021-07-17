const jwt = require('jsonwebtoken');

const generateToken = (userData) => {
  const jwtConfig = { expiresIn: 86400, algorithm: 'HS256' };
  const SECRET = 'meuSegredoMuitoLoko';

  const { password, name, ...payload } = userData;
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};
