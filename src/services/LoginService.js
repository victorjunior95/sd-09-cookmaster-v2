const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const secret = 'segredosupersecreto';

const jwtConfig = {
  expiresIn: '1h',
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

const login = async (email, password) => {
  validateBody(email, password);
  await validateLogin(email, password);
  const user = await UsersModel.findEmail(email);
  const token = jwt.sign({ user }, secret, jwtConfig);
  return { token };
};

module.exports = {
  login,
};