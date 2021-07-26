const rescue = require('express-rescue');
const User = require('../service/userService');

const createNewUser = rescue(async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.createUserService(email, name, password);

  return res.status(201).json(user);
});

const loginController = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.userLoginService(email, password);

  return res.status(200).json(user);
});

module.exports = {
  createNewUser,
  loginController,
};
