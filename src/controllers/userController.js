const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await userService.validateNewUser(name, email, password);

  return newUser.message
    ? next(newUser)
    : res.status(201).json({ user: { ...newUser } });
};

module.exports = {
  createUser,
};
