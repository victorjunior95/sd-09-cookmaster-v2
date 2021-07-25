const INVALID_NEW_USER = {
  code: 400,
  message: 'Invalid entries. Try again.',
};

const EMAIL_ALREADY_EXISTS = {
  code: 409,
  message: 'Email already registered',
};

module.exports = {
  INVALID_NEW_USER,
  EMAIL_ALREADY_EXISTS,
};
