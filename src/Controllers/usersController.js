const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const newUser = await usersService.create(req.body);
  return res.status(201).json(newUser);
};

module.exports = {
  createUser,
};
