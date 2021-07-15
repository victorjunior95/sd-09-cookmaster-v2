const usersService = require('../services/users');

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await usersService.createUser(name, email, password, role);

  if (newUser.code) return next(newUser);

  return res.status(201).json(newUser);
};

module.exports = {
  createUser,
};
