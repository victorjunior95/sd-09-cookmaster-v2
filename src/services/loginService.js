const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');

const SECRET = 'xinforinfola'; // SECRETE aqui apenas para fins didaticos

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const login = async (email, password) => {
  const user = await loginModel.userLogin(email, password);
  if (!user) {
    const objectError = {
      code: 401,
      message: 'Incorrect username or password',
    };
    throw objectError;
  }
  const { _id } = user;
  const userObj = {
    id: _id,
    email,
    role: 'user',
  };
  const token = jwt.sign(userObj, SECRET, jwtConfig);
  return token;
};

module.exports = { login };
