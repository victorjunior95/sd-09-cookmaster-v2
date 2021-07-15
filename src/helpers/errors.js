const {
  BAD_REQUEST,
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

module.exports = {
  ALREADY_EXISTS,
  INVALID_ENTRIES,
};
