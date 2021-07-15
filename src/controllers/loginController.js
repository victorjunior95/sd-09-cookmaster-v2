const loginServices = require('../services/loginServices');

const postLogin = async (req, res, next) => {
  const result = await loginServices.postLogin(req.body);

  // envia o erro para o middleware de tratamento
  if (result.error) return next(result.error);

  // exibe o token
  res.status(200).json(result);
};

module.exports = {
  postLogin,
};