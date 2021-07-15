const status = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHENTICATED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const message = {
  serverError: {message: 'Sistema Indisponível'},
  loginEmpty: {message: 'All fields must be filled'},
  loginIncorrect: {message: 'Incorrect username or password'},
  tokenError: {message:'jwt malformed'},
  tokenMissing: {message: 'missing auth token'},
  invalidEntries: {message: 'Invalid entries. Try again.'},
  emailAlreadyRegistered: {message: 'Email already registered'},
  recipeNotFound: {message: 'recipe not found'},
};

module.exports = {status, message};