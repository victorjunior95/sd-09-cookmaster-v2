const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = '6102acd9063f652fa2e20aa6';
const jwtConfig = { expiresIn: '15m', algorithm: 'HS256' };

const createToken = async (email) => {
  const { password, ...user } = await userModel.getUserByEmail(email);
  const token = jwt.sign(user, secret, jwtConfig);
  return { token };
};

module.exports = createToken;