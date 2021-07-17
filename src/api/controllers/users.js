const users = require('../services/users');

const create = (req, res) => users.create(req.body)
  .then(({ status, user }) => res.status(status).json({ user }));

const login = (req, res) => users.login(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

module.exports = { create, login };
