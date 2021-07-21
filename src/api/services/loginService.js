const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'mestrecucaisthenewcookmaster';
const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};
// algoritmo usado para assinar a mensagem (HMAC-SHA256)

const OK_STATUS = 200;

const UNAUTHORIZED_EMPTY_FIELDS = {
  status: 401,
  err: { message: 'All fields must be filled' },
};

const UNAUTHORIZED_INVALID_DATA = {
  status: 401,
  err: { message: 'Incorrect username or password' },
};

function validateEmail(email) {
  if (!email) throw UNAUTHORIZED_EMPTY_FIELDS;
  const validEmail = new RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]+/).test(email);
  if (!validEmail) throw UNAUTHORIZED_INVALID_DATA;
}

function validatePassword(user, password) {
  if (!password) throw UNAUTHORIZED_EMPTY_FIELDS;
  if (!user || user.password !== password) throw UNAUTHORIZED_INVALID_DATA;
}

const login = async (email, password) => {
  validateEmail(email);
  const registeredUser = await usersModel.getUserByEmail(email);
  validatePassword(registeredUser, password);
  delete registeredUser.name;
  delete registeredUser.password;
  const token = jwt.sign({ data: registeredUser }, secret, jwtConfig);
  return {
    status: OK_STATUS,
    token,
  };
};

module.exports = {
  login,
};
