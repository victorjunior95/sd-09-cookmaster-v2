// Users
const INVALID_NEW_USER = {
  code: 400,
  message: 'Invalid entries. Try again.',
};

const EMAIL_ALREADY_EXISTS = {
  code: 409,
  message: 'Email already registered',
};

// Login
const INVALID_LOGIN_FORMAT = {
  code: 401,
  message: 'All fields must be filled', 
};

const INVALID_LOGIN_DATA = {
  code: 401,
  message: 'Incorrect username or password',
};

module.exports = {
  INVALID_NEW_USER,
  EMAIL_ALREADY_EXISTS,
  INVALID_LOGIN_FORMAT,
  INVALID_LOGIN_DATA,
};
