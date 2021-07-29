const jwtConfig = {
  expiresIn: '50m',
  algorithm: 'HS256',
};

const SECRET = 'MARVEL > DC';

module.exports = {
  jwtConfig,
  SECRET,
};
