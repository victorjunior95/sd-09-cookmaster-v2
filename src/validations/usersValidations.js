const usersModel = require('../models/usersModel');

const BAD_REQUEST = {
  status: 400,
  error: {
    message: 'Invalid entries. Try again.',
  },
};

const CONFLICT = {
  status: 409,
  error: {
    message: 'Email already registered',
  },
};

async function emailExists(email) {
  const user = await usersModel.getUserByEmail(email);
  if (user) throw CONFLICT;
}

function validateName(name) {
  if (!name) throw BAD_REQUEST;
}

function validateEmail(email) {
  const isEmailValid = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/).test(email);
  if (!isEmailValid) {
    throw BAD_REQUEST;
  }
}

function validatePassword(password) {
  if (!password) throw BAD_REQUEST;
}

module.exports = {
  emailExists,
  validateName,
  validateEmail,
  validatePassword,
};
