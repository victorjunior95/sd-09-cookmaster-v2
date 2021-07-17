const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const secret = 'segredosupersecreto';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateBody = (email, password) => {
  const errObj = {
    status: 401,
    message: 'All fields must be filled',
  };
  if (!email || !password) throw errObj;
};

const validateLogin = async (email, password) => {
  const errObj = {
    status: 401,
    message: 'Incorrect username or password',
  };
  const userData = await UsersModel.findEmail(email);
  if (!userData || userData.email !== email || userData.password !== password) throw errObj;
};

const login = async (email, passwords) => {
  validateBody(email, passwords);
  await validateLogin(email, passwords);
  const user = await UsersModel.findEmail(email);
  const { password, ...userInfo } = user;
  const token = jwt.sign({ userInfo }, secret, jwtConfig);
  return { token };
};

module.exports = {
  login,
};