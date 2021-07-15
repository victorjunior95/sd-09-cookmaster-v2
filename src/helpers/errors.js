const {
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT,
} = require('./httpStatus');

const ALREADY_EXISTS = {
  error: { message: 'Email already registered' },
  status: CONFLICT,
};

const INVALID_ENTRIES = { 
  error: { message: 'Invalid entries. Try again.' },
  status: BAD_REQUEST,
};

const EMPTY_FIELD = {
  error: { message: 'All fields must be filled' },
  status: UNAUTHORIZED,
};

const INCORRECT_CREDENTIALS = {
  error: { message: 'Incorrect username or password' },
  status: UNAUTHORIZED,
};

const TOKEN_NOT_FOUND = {
  error: { message: 'jwt malformed' },
  status: UNAUTHORIZED,
};

module.exports = {
  ALREADY_EXISTS,
  INVALID_ENTRIES,
  EMPTY_FIELD,
  INCORRECT_CREDENTIALS,
  TOKEN_NOT_FOUND,
};
