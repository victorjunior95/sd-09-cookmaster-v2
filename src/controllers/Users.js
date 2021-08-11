const rescue = require('express-rescue');
const UsersService = require('../services/Users');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const { result, code } = await UsersService.createUser(name, email, password);
  res.status(code).json(result);
});

const createAdmin = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req;
  const { result, code } = await UsersService.createAdmin(name, email, password, role);
  res.status(code).json(result);
});

module.exports = { createUser, createAdmin };