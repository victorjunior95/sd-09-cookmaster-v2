const rescue = require('express-rescue');
const usersService = require('../services/usersService');

const add = rescue(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await usersService.add(name, email, password, role);

  if (!user) {
    return next({
      status: 409,
      message: 'Email already registered',
    });
  }

  return res.status(201).json(user);
});

const addAdmin = rescue(async (req, res, _next) => {
  const { name, email, password } = req.body;

  const admin = await usersService.addAdmin(name, email, password);

  return res.status(201).json(admin);
});

module.exports = {
  add,
  addAdmin,
};
