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

module.exports = {
  add,
};
