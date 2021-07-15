const UserService = require('../services/users');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserService.registerUser({ name, email, password });

  return user.code
    ? res.status(user.code).json({ message: user.message })
    : res.status(201).json({ user });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const token = await UserService.userLogin({ email, password });

  return token.code
    ? res.status(token.code).json({ message: token.message })
    : res.status(200).json({ token });
};

module.exports = {
  registerUser,
  userLogin,
};
