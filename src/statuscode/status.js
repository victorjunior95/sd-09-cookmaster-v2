const OK = 200;
const CREATE = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;
const INVALID_ENTRIES = 'Invalid entries. Try again.';
const ERR_ALL = 'All fields must be filled';
const ERR_INCORRECT = 'Incorrect username or password';

module.exports = {
  OK,
  CREATE,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  INVALID_ENTRIES,
  ERR_ALL,
  ERR_INCORRECT,
};