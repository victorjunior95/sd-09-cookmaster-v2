const { messages, codes, objectError } = require('./ErrorHandling');
const { EMAIL_REGEX } = require('./Regex');

const ValidateUser = (name, email, password) => {
  if (!name || !email || !password) {
    return objectError(messages.INVALID_ENTRIES, codes.CODE_400);
  }
  if (!EMAIL_REGEX.test(email)) {
    return objectError(messages.INVALID_ENTRIES, codes.CODE_400);
  }
  return {};
};

const emailAlreadyExists = async (exists) => {
  if (exists) return objectError(messages.EMAIL_REGISTERED, codes.CODE_409);
  return {};
};

const validateAdmin = (role) => {
  if (role !== 'admin') return objectError(messages.NOT_ADMIN, codes.CODE_403);
  return {};
};

module.exports = { ValidateUser, emailAlreadyExists, validateAdmin };