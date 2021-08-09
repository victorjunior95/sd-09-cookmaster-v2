const jwt = require('jsonwebtoken');
const usersModel = require('../users/users.model');

const tokenGenerator = (user) => {
  const secret = '2021cookmasterv2';
  const config = { expiresIn: '15m', algorithm: 'HS256' };

  return jwt.sign(user, secret, config);
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

module.exports = { login };
