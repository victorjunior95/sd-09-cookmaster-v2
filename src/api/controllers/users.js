const users = require('../services/users');

const create = async (req, res) => {
  const { body } = req;
  const response = await users.create(body);
  const { status, user } = response;
  res.status(status).json({ user });
};

module.exports = { create };