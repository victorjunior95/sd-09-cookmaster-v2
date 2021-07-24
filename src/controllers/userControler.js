const rescue = require('express-rescue');
const User = require('../service/userService');

const createNewUser = rescue(async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.userCreate(email, name, password);

  return res.status(201).json(user);
});

module.exports = {
  createNewUser,
};
