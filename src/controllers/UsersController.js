const usersService = require('../services/UsersService');

const checkBody = async (req, res, next) => {
  const { name, email, password } = req.body;
  const answer = await usersService.checkBody(name, email, password);
  if (typeof answer === 'object') {
    const { status, message } = answer;
    return res.status(status).json({ message });
  }
  return next();
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password, role: 'user' };
  console.log(`controller ${user.name}, ${user.email}, ${user.password}, ${user.role}`);
  const { status, message } = await usersService.register(user);

  delete user.password;

  res.status(status).json(message);
};

module.exports = {
  checkBody,
  registerUser,
};
