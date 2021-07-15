const loginModels = require('../models/loginModels');
const generateToken = require('../auxiliarFunctions/generateToken');

const postLogin = async (loginInput) => {
  const result = await loginModels.postLogin(loginInput);

  // Trata os erros trazidos pelo model
  if (result.error) return { error: { code: 401, message: 'Incorrect username or password' } };

  // gera um token com os dados do usuario encontrado, com is, name, email e role.
  const token = generateToken(result);

  return { token };
};

module.exports = {
  postLogin,
};