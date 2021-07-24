const errorMessages = {
  userFieldNExists: 'Invalid entries. Try again.',
  emailAlreadyExists: 'Email already registered',
  loginFieldNExists: 'All fields must be filled',
  incorrectLogin: 'Incorrect username or password',
  notFoundUser: 'User not found',
  badJWT: 'jwt malformed',
  recipeNotFound: 'recipe not found',
  missingToken: 'missing auth token',
  userForbidden: 'Forbidden',
  onlyAdmin: 'Only admins can register new admins',
};

module.exports = errorMessages;
