const jwt = require('jsonwebtoken');
const users = require('../models/users');

const secret = '60f25632bbd8eb246fbe3170';
const jwtConfig = { expiresIn: '15m', algorithm: 'HS256' };

const generateToken = async (email) => {
  const { password, ...user } = await users.getByEmail(email);
  const token = jwt.sign(user, secret, jwtConfig);
  return { token };
};

module.exports = generateToken;
