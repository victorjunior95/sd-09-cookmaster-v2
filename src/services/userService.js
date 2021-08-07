/* eslint no-underscore-dangle: 0 */
const jwt = require('jsonwebtoken');
const { user } = require('../models');

const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_CONFLICT_STATUS = 409;

const ENTRIES_ERROR = 'Invalid entries. Try again.';
const EMAIL_CONFLICT_ERROR = 'Email already registered';
const LOGIN_INCORRECT_ERROR = 'Incorrect username or password';

const emailValidator = (email) => {
  const emailRegex = /^[0-9a-zA-Z._-]+@[a-z]*mail\.com(\.[a-z]{2})?$/;

  return emailRegex.test(email);
};

const addUser = async (userData) => {
  if (!emailValidator(userData.email)) {
    const err = new Error(ENTRIES_ERROR);

    err.statusCode = HTTP_BAD_REQUEST_STATUS;

    return err;
  }

  const usedEmail = await user.findByEmail(userData.email);

  if (usedEmail) {
    const err = new Error(EMAIL_CONFLICT_ERROR);

    err.statusCode = HTTP_CONFLICT_STATUS;

    return err;
  }

  return user.addUser(userData);
};

const login = async (userData) => {
  if (!emailValidator(userData.email)) {
    const err = new Error(LOGIN_INCORRECT_ERROR);

    err.statusCode = HTTP_UNAUTHORIZED_STATUS;

    return err;
  }

  const loginSuccessful = await user.findUser(userData);

  if (!loginSuccessful) {
    const err = new Error(LOGIN_INCORRECT_ERROR);

    err.statusCode = HTTP_UNAUTHORIZED_STATUS;

    return err;
  }

  const payload = {
    id: loginSuccessful._id,
    email: userData.email,
    role: loginSuccessful.role,
  };

  const token = jwt.sign(payload, 'segredo');

  return { token };
};

module.exports = {
  addUser,
  login,
};
