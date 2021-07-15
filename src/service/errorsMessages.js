const HTTP_STATUS_BAD_REQUEST = 400;
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

module.exports = {
  invalidEntriesError,
  emailRegisteredError,
}