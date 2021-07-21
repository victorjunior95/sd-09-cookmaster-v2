const rescue = require('express-rescue');
const User = require('../services/users');

const createUser = rescue(async (req, res, _next) => {
  const newUser = await User.createUser(req.body);
  delete newUser.password;
  return res.status(201).json({ user: newUser });
});

module.exports = {
  createUser,
};