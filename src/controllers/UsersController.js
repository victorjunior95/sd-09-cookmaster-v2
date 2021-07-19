const usersService = require('../services/UsersService');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const user = { name, email, password, role: 'user' };
  const { status, message } = await usersService.register(user);

  res.status(status).json(message);
};

module.exports = {
  registerUser,
};
