const usersModels = require('../models/usersModels');

const postNewUser = async (userInfo) => {
  const result = await usersModels.postNewUser(userInfo);

  // trata o erro do passo anterior
  if (result.name) return { error: { code: 409, message: 'Email already registered' } };

  // envia o id do usuário recém cadastrado
  return result;
};

module.exports = {
  postNewUser,
};