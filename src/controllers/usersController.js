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

const postNewAdmin = async (req, res, next) => {
  const { role } = req;
  
  if (role !== 'admin') return next({ code: 403, message: 'Only admins can register new admins' });
  const { name, email, password } = req.body;

  const result = await usersServices.postNewAdmin({ name, email, password });

  // // envia o erro para o middleware tratar
  if (result.error) return next(result.error);

  // exibe os dados do novo usuário
  res.status(201).json({
    user: {
      name,
      email,
      role,
      _id: result.insertedId,
    },
  });
};

module.exports = {
  postNewUser,
  postNewAdmin,
};
