const messages = {
  INVALID_ENTRIES: 'Invalid entries. Try again.',
  EMAIL_REGISTERED: 'Email already registered',
  LOGIN_FIELDS: 'All fields must be filled',
  INVALID_LOGIN: 'Incorrect username or password',
  INVALID_TOKEN: 'jwt malformed',
  MISSING_TOKEN: 'missing auth token',
  INVALID_RECIPE: 'recipe not found',
  NOT_ADMIN: 'Only admins can register new admins',
};

const codes = {
  CODE_400: 400,
  CODE_409: 409,
  CODE_401: 401,
  CODE_404: 404,
  CODE_403: 403,
};

const objectError = (message, code) => ({ result: { message }, code });

module.exports = { messages, codes, objectError };
