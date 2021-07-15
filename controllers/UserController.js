const rescue = require('express-rescue');
const UserService = require('../services/UserService');

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await UserService.create(name, email, password);

  return res.status(201).json({ user });
});

module.exports = {
  create,
};