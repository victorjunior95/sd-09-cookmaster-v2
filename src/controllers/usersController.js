const usersService = require('../services/usersService');
// recebe os dados, joga para o service processar e devolve a resposta
const usersCreate = async (req, res, next) => {
  try {
  const { email, name, password } = req.body;

  const userCreate = await usersService.createUserService(email, name, password);
  return res.status(201).json({ user: userCreate });
  } catch (error) {
  return next(error);
  }
};

module.exports = usersCreate;
