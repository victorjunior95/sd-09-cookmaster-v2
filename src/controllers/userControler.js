const rescue = require('express-rescue');
const User = require('../service/userService');

const createNewUser = rescue(async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.createUserService(email, name, password);

  return res.status(201).json(user);
});

const loginController = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ code: 'unauthorized', message: 'All fields must be filled' });
  }
  const token = await User.userLoginService(email, password);
  if (token.err) return next(token.err);
  res.status(200).json({ token });
});

module.exports = {
  createNewUser,
  loginController,
};
