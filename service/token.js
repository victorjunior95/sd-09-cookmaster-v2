const jwt = require('jsonwebtoken');

const secret = '1234';
const generateToken = (email, id, role) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  try {
    const token = jwt.sign({ email, id, role }, secret, jwtConfig);
    return token;
  } catch (e) {
    const erro = {
      status: 400,
      message: 'function sing is tired. try later',
    };
    throw erro;
  }
};

module.exports = {
  generateToken,
};