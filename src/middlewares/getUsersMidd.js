const usersService = require('../services/usersService');

module.exports = async (_req, res) => {
  const users = await usersService.findAllUsers();

  return res.status(200).json({ users });
};
