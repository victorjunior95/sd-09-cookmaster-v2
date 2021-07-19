const loginModel = require('../models/loginModel');
const { validateError, schema } = require('./schemas/loginSchema');

const login = async (email, password) => {
  const { error } = schema.validate({ email, password });

  if (error) throw validateError(401, error.message);

  const result = await loginModel.findUser(email, password);

  if (!result) throw validateError(401, 'Incorrect username or password');

  // retornar token
  return { token: result };
};

module.exports = { login };
