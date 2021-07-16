const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const invalidInfos = (email, password) => {
  if (!email || !password) {
    const error = { status: 401, message: 'All fields must be filled' };
    throw error;
  }
};

const userInfoDb = async (email, password) => {
  const userEmail = await usersModel.findEmail(email);
  const userPassword = await usersModel.login(email, password);
  const error = { status: 401, message: 'Incorrect username or password' };
  if (!userEmail || !userPassword) throw error;
};

const login = async (userInfo) => {
  invalidInfos(userInfo.email, userInfo.password);
  await userInfoDb(userInfo.email, userInfo.password);
  const user = await usersModel.findEmail(userInfo.email);
  delete user.password;
  // crio o token jwt
  const secret = 'senhamaisseguradomundo';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ user }, secret, jwtConfig);
  return { token };
};

module.exports = {
  login,
};
