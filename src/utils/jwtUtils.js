const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const SECRET = 'MARVEL > DC';

module.exports = {
  jwtConfig,
  SECRET,
};
