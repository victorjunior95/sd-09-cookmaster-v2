const rescue = require('express-rescue');
const User = require('../service/userService');

const createNewUser = rescue(async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.createUserService(email, name, password);

  return res.status(201).json(user);
});

const loginController = rescue(async (req, res) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return next({ code: 'unauthorized', message: 'All fields must be filled' });
  }
  const token = await User.userLoginService(email, password);
  if (token.err) return next(token.err);
  response.status(OK).json({ token });
});

module.exports = {
  createNewUser,
  loginController,
};
