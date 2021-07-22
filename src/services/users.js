const jwt = require('jsonwebtoken');
const modelUsers = require('../models/users');

const SECRET = 'mysupersecret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const ValidLogin = async (email, password) => {
  const token = jwt.sign({ email, password }, SECRET, jwtConfig);
  return token;
};

const createUser = async (name, email, password) => {
  const user = await modelUsers.createUser(name, email, password);
  return user;
};

module.exports = {
  createUser,
  ValidLogin,
};
