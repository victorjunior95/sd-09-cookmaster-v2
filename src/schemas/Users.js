const errMessages = {
  INVALID_ENTRIES: 'Invalid entries. Try again.',
  EMAIL_REGISTERED: 'Email already registered',
};

const errCodes = {
  CODE_400: 400,
  CODE_409: 409,
};

const EMAIL_REGEX = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

const objectError = (message, code) => ({ result: { message }, code });

const ValidateUser = (name, email, password) => {
  if (!name || !email || !password) {
    return objectError(errMessages.INVALID_ENTRIES, errCodes.CODE_400);
  }
  if (!EMAIL_REGEX.test(email)) {
    return objectError(errMessages.INVALID_ENTRIES, errCodes.CODE_400);
  }
  return {};
};

const emailAlreadyExists = async (exists) => {
  if (!exists) return objectError(errMessages.EMAIL_REGISTERED, errCodes.CODE_409);
  return {};
};

module.exports = { ValidateUser, emailAlreadyExists };