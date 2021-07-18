const jwt = require('jsonwebtoken');

const SECRET = 'meuSegredoMuitoLoko';

const generateToken = (userData) => {
  const jwtConfig = { expiresIn: 86400, algorithm: 'HS256' };

  const { password, name, ...payload } = userData;
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  if (!token) {
    const err = { status: 401, message: 'missing auth token' };
    throw err;
  }

  try {
    const userData = jwt.verify(token, SECRET);
    const { _id: userId } = userData;
    return { userId };
  } catch (error) {
    const err = { status: 401, message: error.message };
    throw err;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
