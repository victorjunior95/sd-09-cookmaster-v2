const jwt = require('jsonwebtoken');

const JWT_SECRET = 'juroSolenementeNaoFazerNadaDeBom';

const createJWT = (payload, [timeAmount, timeUnit]) => (
  jwt.sign(payload, JWT_SECRET, { expiresIn: timeAmount + timeUnit })
);

const verifyJWT = (token) => (
  jwt.verify(token, JWT_SECRET)
);

module.exports = {
  access: {
    name: 'access token',
    expiration: [15, 'm'],
    create(payload) {
      return createJWT(payload, this.expiration);
    },
    verify(token) {
      return verifyJWT(token);
    },
  },
};