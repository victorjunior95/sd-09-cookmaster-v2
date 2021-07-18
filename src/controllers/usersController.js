const users = require('../services/usersService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await users.create({ name, email, password });
  return res.status(201).json(result);
};

const createAdmin = async (req, res) => {
  const token = req.headers.authorization;
  const { name, email, password } = req.body;
  const result = await users.createAdmin({ name, email, password }, token);
  return res.status(201).json(result);
};

module.exports = {
  create,
  createAdmin,
};
