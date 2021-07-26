const usersService = require('../services/UsersService');

const checkBody = async (req, res, next) => {
  console.log(`controller ${req.body}`);
  const { name, email, password } = req.body;
  console.log(`controller ${name}, ${email}, ${password}`);
  const answer = await usersService.checkBody(name, email, password);
  console.log(`controller ${answer}`);
  if (typeof answer === 'object') {
    const { status, message } = answer;
    return res.status(status).json({ message });
  }
  return next();
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    user: {
      name, email, password, role: 'user',
    },
  };
  // console.log(`controller ${user.user.name}, ${user.user.email},
  // ${user.user.password}, ${user.user.role}`);
  const { status, message } = await usersService.register(user);

  // console.log(`controller ${message.user.password}`);
  delete message.user.password;

  res.status(status).json(message);
};

module.exports = {
  checkBody,
  registerUser,
};
