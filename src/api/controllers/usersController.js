const usersService = require('../services/usersService');

const registerUser = async (req, res) => {
  const newUser = req.body;
  const { status, registeredUser } = await usersService.registerUser(newUser);
  res.status(status).json({ user: registeredUser });
};

module.exports = {
  registerUser,
};
