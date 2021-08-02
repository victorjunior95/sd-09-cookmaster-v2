const { messages, codes, objectError } = require('./ErrorHandling');
const { EMAIL_REGEX } = require('./Regex');

const validateLogin = (email, password) => {
  if (!email || !password) {
    return objectError(messages.LOGIN_FIELDS, codes.CODE_401);
  }
  if (!EMAIL_REGEX.test(email)) {
    return objectError(messages.INVALID_LOGIN, codes.CODE_401);
  }
  return {};
};

const ValidatePassword = (reqPassword, userData) => {
  if (!userData || reqPassword !== userData.Senha) {
    return objectError(messages.INVALID_LOGIN, codes.CODE_401);
  }
  return {};
};

module.exports = { validateLogin, ValidatePassword };