const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_BAD_UNAUTHORIZED = 401;
const HTTP_STATUS_CONFLICT = 409;

const invalidEntriesError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: 'Invalid entries. Try again.',
  },
};

const emailRegisteredError = {
  status: HTTP_STATUS_CONFLICT,
  err: {
    message: 'Email already registered',
  },
};

const allFieldsError = {
  status: HTTP_STATUS_BAD_UNAUTHORIZED,
  err: {
    message: 'All fields must be filled',
  },
};

const incorrectEmailOrPassword = {
  status: HTTP_STATUS_BAD_UNAUTHORIZED,
  err: {
    message: 'Incorrect username or password',
  },
};

module.exports = {
  invalidEntriesError,
  emailRegisteredError,
  allFieldsError,
  incorrectEmailOrPassword,
};
