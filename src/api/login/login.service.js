const jwt = require('jsonwebtoken');
const usersModel = require('../users/users.model');

const secret = '2021cookmasterv2';
const config = { expiresIn: '15m', algorithm: 'HS256' };
const tokenGenerator = (user) => jwt.sign(user, secret, config);

const tokenValidator = async (token) => {
  const tokenData = token && jwt.decode(token, secret);
  const user = tokenData && await usersModel.getUserByEmail(tokenData.email);
  return user && tokenData;
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    return { status: 401, data: { message: 'All fields must be filled' } };
  }

  const user = await usersModel.getUserByEmail(email);

  if (!user || user.password !== password) {
    return { status: 401, data: { message: 'Incorrect username or password' } };
  }

  delete user.password;

  const token = tokenGenerator(user);

  return { status: 200, data: { token } };
};

module.exports = { login, tokenValidator, tokenGenerator };
