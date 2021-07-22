const usersService = require('../services/usersService');

const DEFAULT_SUCCESS_STATUS = 200;
const CREATE_SUCCESS_STATUS = 201;

// colocando qualquer coisa só pra dar um novo push

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const role = 'user';
    const newUser = await usersService.createUser({ ...user, role });
    return res.status(CREATE_SUCCESS_STATUS).json({ user: newUser });
  } catch (err) { return next(err); }
};

const loginUser = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await usersService.loginUser(user);
    return res.status(DEFAULT_SUCCESS_STATUS).json({ token });
  } catch (err) { return next(err); }
};

module.exports = {
  createUser,
  loginUser,
};
