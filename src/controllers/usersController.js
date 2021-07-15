const usersServices = require('../services/usersServices');

const postNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const result = await usersServices.postNewUser({ name, email, password });

  // envia o erro para o middleware tratar
  if (result.error) return next(result.error);

  // exibe os dados do novo usuário
  res.status(201).json({
    user: {
      name,
      email,
      role: 'user',
      _id: result.insertedId,
    },
  });
};

module.exports = {
  postNewUser,
};
