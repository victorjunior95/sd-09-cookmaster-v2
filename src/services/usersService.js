const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const helpers = require('../helpers');

const SECRET = 'MinhaSenhaSuperSecretaSoQueNao';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createUser = async (name, email, password) => {
  if (helpers.checkUserData(name, email, password)) {
    return helpers.checkUserData(name, email, password);
  }
  const user = await usersModel.createUser(name, email, password);
  return user;
};

const getUserByEmail = async (email) => {
  const userEmail = await usersModel.getUserByEmail(email);

  return userEmail;
};

const userLogin = async (email, password) => {
  const userSearch = await usersModel.getUserByEmail(email);

  if (helpers.checkLoginData(email, password)) return helpers.checkLoginData(email, password);

  if (helpers.checkEmailAndPassword(userSearch, email, password)) {
    return helpers.checkEmailAndPassword(userSearch);
  }
  const { password: _, ...userWithoutPassword } = userSearch;
  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);
  return { token };
};

module.exports = {
  createUser,
  getUserByEmail,
  userLogin,
};