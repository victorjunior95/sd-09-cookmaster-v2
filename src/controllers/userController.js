const userServices = require('../services/userServices');

const createUser = (req, res) => userServices.create(req.body)
  .then(({ status, user }) => res.status(status).json({ user }));

const login = (req, res) => userServices.login(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

  const createUserAdmin = (req, res) => userServices.create(req.body, 'admin')
  .then(({ status, user }) => res.status(status).json({ user }));

module.exports = { createUser, login, createUserAdmin };

// dispara informações/queries
// comunica com usuário
// retorna resposta