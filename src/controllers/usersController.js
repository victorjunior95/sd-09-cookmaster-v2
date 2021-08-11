const usersServices = require('../services/usersService');

const registerUserControllers = async (req, res, _next) => {
  const user = req.body;
  const { status, result } = await usersServices.registerUserServices(user);
  return res.status(status).json(result);
};

const registerAdminControllers = async (req, res, _next) => {
  const admin = req.body;
  const { role } = req.user;
  const { status, result } = await usersServices.registerAdminServices(admin, role);
  return res.status(status).json(result);
};

const userLoginControllers = async (req, res, _next) => {
  const login = req.body;
  const { status, result } = await usersServices.userLoginServices(login);
  return res.status(status).json(result);
};

module.exports = {
  registerAdminControllers,
  registerUserControllers,
  userLoginControllers,
};
