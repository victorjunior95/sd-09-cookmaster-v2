const { validateNameAndPass, emailAlreadyExists } = require('./userValidator');
const { verifyEmailAndPassword, isValidEmailOrPassword } = require('./loginValidator');
const { entriesValidator } = require('./recipeValidator');
const { validateJWT } = require('./validateJWT');

module.exports = {
  validateNameAndPass,
  emailAlreadyExists,
  verifyEmailAndPassword,
  isValidEmailOrPassword,
  entriesValidator,
  validateJWT,
};