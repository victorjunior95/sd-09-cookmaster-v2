const usersModels = require('./usersModels');

const postLogin = async (loginInput) => {
  const { email, password } = loginInput;

  const user = await usersModels.getUserByEmail(email);

  // Se não acha um usuario, retorna um erro
  if (!user) return ({ error: {} });

  // Se a senha não bate com o que temos no DB retorna um erro
  if (user.password !== password) return ({ error: {} });

  const { password: userPassword, ...userData } = user;

  // Retorna os dados do usuario sem a senha
  return { data: userData };
};

module.exports = {
  postLogin,
};
