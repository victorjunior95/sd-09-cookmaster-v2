const jwt = require('jsonwebtoken');
const loginValidations = require('../validations/loginValidations');
const usersModel = require('../models/usersModel');

const privateKey = 'myprecious';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

async function login(email, password) {
  loginValidations.validateFields(email, password);
  const user = await usersModel.getUserByEmail(email);
  loginValidations.validateCredentials(user, password);
  delete user.password;
  const token = jwt.sign({ data: user }, privateKey, jwtConfig);
  return { status: 200, response: { token } };
}

module.exports = {
  login,
};
