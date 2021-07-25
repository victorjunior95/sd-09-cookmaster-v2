const BAD_REQUEST_INVALID_ENTRIES = {
  status: 400,
  err: {
    message: 'Invalid entries. Try again.',
  },
};

const CONFLICT_EMAIL_ALREADY_REGISTERED = {
  status: 409,
  err: {
    message: 'Email already registered',
  },
};

const UNAUTHORIZED_ALL_FIELDS_MUST_BE_FILLED = {
  status: 401,
  err: {
    message: 'All fields must be filled',
  },
};

const UNAUTHORIZED_INCORRECT_USERNAME_OR_PASSWORD = {
  status: 401,
  err: {
    message: 'Incorrect username or password',
  },
};

const UNAUTHORIZED_JWT_MALFORMED = {
  status: 401,
  err: {
    message: 'jwt malformed',
  },
};

const UNAUTHORIZED_MISSING_AUTH_TOKEN = {
  status: 401,
  err: { message: 'missing auth token' },
};

module.exports = {
  BAD_REQUEST_INVALID_ENTRIES,
  CONFLICT_EMAIL_ALREADY_REGISTERED,
  UNAUTHORIZED_ALL_FIELDS_MUST_BE_FILLED,
  UNAUTHORIZED_INCORRECT_USERNAME_OR_PASSWORD,
  UNAUTHORIZED_JWT_MALFORMED,
  UNAUTHORIZED_MISSING_AUTH_TOKEN,
};
