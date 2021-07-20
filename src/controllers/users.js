const rescue = require('express-rescue');
const User = require('../services/users');

const createUser = rescue(async (req, res, _next) => {
  const newUser = await User.createUser(req.body);
  return res.status(201).json(newUser);
});

module.exports = {
  createUser,
};