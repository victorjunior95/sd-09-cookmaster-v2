const usersService = require('../services/usersService');

module.exports = async (req, res) => {
  const { email } = req.params;

  const listUser = await usersService.findOneUser(email);

  if (listUser.err) return res.status(400).json(listUser);

  return res.status(200).json(listUser);
};
