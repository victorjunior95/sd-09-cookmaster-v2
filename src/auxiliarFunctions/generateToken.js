const jwt = require('jsonwebtoken');

// exemplo de uma key  de 256-bit
// normalmente essa key deve ficar escondida...
const secret = '2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&';

const createToken = (data) => {
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(data, secret, jwtConfig);

  return token;
};

module.exports = createToken;