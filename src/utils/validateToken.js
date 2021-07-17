const jwt = require('jsonwebtoken');

const SECRET = 'meuSegredoMuitoLoko';

const generateToken = (userData) => {
  const jwtConfig = { expiresIn: 86400, algorithm: 'HS256' };

  const { password, name, ...payload } = userData;
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  try {
    const userData = jwt.verify(token, SECRET);
    const { _id } = userData;
    return _id;  
  } catch (error) {
    const err = { status: 401, message: 'jwt malformed' };
    throw err;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
