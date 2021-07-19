const loginModel = require('../models/loginModel');
const { validateError } = require('./schemas/loginSchema');

const login = async (email, password) => {
  const result = await loginModel.findUser(email, password);

  console.log('[find user] >', result);

  if (!result) throw validateError(401, 'Incorrect username or password');

  // retornar token
  return { token: result };
};

module.exports = { login };
