const model = require('../model');
const response = require('../helpers/response');
const validateEmail = require('../helpers/validateEmail');

const signIn = async (name, email, password, role = 'user') => {
  if (
    !name
    || !password
    || !validateEmail(email)
  ) return response(400, 'Invalid entries. Try again.');

  const alreadyExists = await model.users.findUserByEmail(email);
  if (alreadyExists) return response(409, 'Email already registered');

  const { status, user } = await model.users.signIn(name, email, password, role);

  return {
    status,
    user,
  };
};

module.exports = {
  signIn,
};
