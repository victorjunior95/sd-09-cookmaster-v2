const usersService = require('../service/usersService');

const HTTP_STATUS_CREATED = 201;

const createUser = async (req, res, _next) => {
  const newUser = req.body;
  const result = await usersService.createUser(newUser);
  return res.status(HTTP_STATUS_CREATED).json({ user: result });
};

const createAdmin = async (req, res, _next) => {
  const newAdmin = req.body;
  const { user } = req;
  const result = await usersService.createAdmin(newAdmin, user);
  res.status(HTTP_STATUS_CREATED).json({ user: result });
};

module.exports = {
  createUser,
  createAdmin,
};
