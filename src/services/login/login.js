const jwt = require('jsonwebtoken');
const { verifyEmail, verifyPassword } = require('../utils/regex');
const userExists = require('../utils/userExists');

const secret = 'cookmastertoken';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const fieldsNExist = (email, password) => {
  if (!email || !password) {
    return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'loginFieldNExists' };
  }

  return null;
};

const verifyFields = (email, password) => {
  if (!verifyEmail(email) || !verifyPassword(password)) {
    return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'incorrectLogin' };
  }

  return null;
};

const verifyLogin = (email, password) => {
  const fields = fieldsNExist(email, password);

  if (fields) {
    return fields;
  }

  const errorFields = verifyFields(email, password);

  if (errorFields) {
    return errorFields;
  }

  return null;
};

const validateUserPassword = (user, password) => user.password === password;

const setLogin = async (email, password) => {
  const invalidLogin = verifyLogin(email, password);
  if (invalidLogin) {
    return invalidLogin;
  }
  
  const user = await userExists('email', email);

  if (!user) {
    return { error: true, code: 'STATUS_NOT_FOUND', message: 'notFoundUser' };
  }

  if (!validateUserPassword(user, password)) {
    return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'incorrectLogin' };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    jwtConfig,
  );

  return { error: false, code: 'STATUS_OK', message: token };
};

module.exports = setLogin;
