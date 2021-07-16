const userService = require('../services/userServices');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = await userService.create({ name, email, password, role: 'user' });
  return res
    .status(201)
    .json({ user: { _id: id, name, email, role: 'user' } });
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = await userService.create({ name, email, password, role: 'admin' });
  return res
    .status(201)
    .json({ user: { _id: id, name, email, role: 'admin' } });
};

module.exports = {
  create,
  createAdmin,
};