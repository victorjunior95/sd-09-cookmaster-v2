const validateEmailFormat = require('./validateEmailFormat');

const BAD_REQUEST = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const validateBody = (name, email, password) => {
  // name é obrigatório
  if (!name) return BAD_REQUEST;

  // email é obrigatório
  if (!email) return BAD_REQUEST;

  // validar formato do email
  const emailIsValid = validateEmailFormat(email);
  if (!emailIsValid) return BAD_REQUEST;

  // password é obrigatório
  if (!password) return BAD_REQUEST;

  return null;
};

module.exports = {
  validateBody,
};
