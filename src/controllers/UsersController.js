const UserService = require('../services/UserService');

const list = async (_req, res, next) => {
  try {
    const users = await UserService.listAllUsers();

    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await UserService.registerUser(user);
    return res.status(201).json(newUser.ops[0]);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  list,
  register,
};
