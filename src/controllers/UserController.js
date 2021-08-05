const rescue = require('express-rescue');

const Service = require('../services/UserService');
const { OK } = require('../middleware/httpStatus');

const createUser = rescue(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;

  const user = await Service.createUser(name, email, password, role);

  if (user.error) {
    return next(user.error);
  }

  return res.status(201).json(user);
});

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const userLogin = await Service.login(email, password);

  if (userLogin.error) {
    return next(userLogin.error);
  }

  res.status(OK).json(userLogin);
});

const createAdmin = rescue(async (req, res, next) => {
  // const { name, email, password, role = 'admin' } = req.body;

  const admin = await Service.createAdmin(req.body, req.user);

  if (admin.error) {
    return next(admin.error);
  }

  return res.status(201).json(admin);
 });

module.exports = {
  createUser,
  login,
  createAdmin,
};