const { validateNameAndPass, emailAlreadyExists } = require('./userValidator');
const { verifyEmailAndPassword, isValidEmailOrPassword } = require('./loginValidator');

module.exports = {
  validateNameAndPass,
  emailAlreadyExists,
  verifyEmailAndPassword,
  isValidEmailOrPassword,
};