const jwt = require('jsonwebtoken');
const userModel = require('../model/users');

const SECRET = 'MaxSecret';
const jwtConfig = {
  expiresIn: '15min',
  algorithm: 'HS256',
};

const registerUser = async (newUser) => {
  const response = await userModel.registerUser(newUser);
  if (!response) return { status: 400, payload: 'error' };
  return { status: 201, payload: { user: response } };
};

const userLogin = async (email, password) => {
  const isUserFound = await userModel.userLogin(email, password);
  console.log(isUserFound);
  if (isUserFound) {
    const token = jwt.sign({ email }, SECRET, jwtConfig);
    return { status: 200, payload: { token } };
  }

  return { status: 401, payload: { message: 'Incorrect username or password' } };
};

module.exports = { registerUser, userLogin };
