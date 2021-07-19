const usersModel = require('../models/usersModel');
const errorMiddleware = require('../middlewares/errorMiddleware');
// validaçoes de rotas e os usos de JWT. Recebe as regras de negócios do Services e despacha para o App

const uniqueEmailService = async (email) => {
  const users = await usersModel.uniqueEmail(email);
  return users;
};

const createUserService = async (email, name, password) => {
  const userUnique = await uniqueEmailService(email);
  if (userUnique) throw errorMiddleware.validateError(409, 'Email already registered');

  const newUser = await usersModel.createUser(email, name, password);
  // console.log(newUser);
  const { password: _, ...newUserWithout } = newUser; // apagando o password
  // passdb
  return newUserWithout;
};

module.exports = {
  createUserService,
  uniqueEmailService,
};