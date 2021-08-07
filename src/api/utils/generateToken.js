const jwt = require('jsonwebtoken');
const users = require('../models/users');

const secret = 'meusegredosecreto';
const jwtConfig = { expiresIn: '15m', algorithm: 'HS256' };

const generateToken = async (email) => {
  const { password, ...user } = await users.getByEmail(email);
  const token = jwt.sign(user, secret, jwtConfig);
  return { token };
};

module.exports = generateToken;