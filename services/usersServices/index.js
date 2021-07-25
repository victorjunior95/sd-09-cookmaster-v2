const jwt = require('jsonwebtoken');
const usersModels = require('../../models/users');
const { validateUserInfos } = require('./validateUserInfos');
const { validateLoginData, validateCompatibleLoginData } = require('./validateLoginData');

const secret = 'blablabla';
const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const insertUser = async (name, email, password) => {
  const validateUserInfosErr = validateUserInfos(name, email, password);
  if (validateUserInfosErr) {
    return validateUserInfosErr;
  }
  const insertedUser = await usersModels.insertUser(name, email, password);
  return insertedUser;
};

const getUserByEmail = async (email) => {
  const registeredEmail = await usersModels.getUserByEmail(email);
  return registeredEmail;
};

const createToken = async (email, password) => {
  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return token;
};

const userLogin = async (email, password) => {
  const validateLoginDataErr = validateLoginData(email, password);
  if (validateLoginDataErr) {
    return validateLoginDataErr;
  }
  const compatibleUserErr = await validateCompatibleLoginData(email, password);
  return compatibleUserErr;
};

module.exports = {
  insertUser,
  createToken,
  userLogin,
  getUserByEmail,
};
