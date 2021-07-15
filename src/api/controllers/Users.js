const rescue = require('express-rescue');
const service = require('../services/Users');

const STATUS = {
  CREATED: 201,
  OK: 200,
};

const registerUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await service.registerUser(name, email, password);

  if (newUser.message) return next(newUser);

  return res.status(STATUS.CREATED).json(newUser);
});

module.exports = {
  registerUser,
};
