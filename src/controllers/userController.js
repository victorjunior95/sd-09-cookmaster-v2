const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await userService.validateNewUser(name, email, password);

  return newUser.message
    ? next(newUser)
    : res.status(201).json({ user: { ...newUser } });
};

const createAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { userRole } = req;

  if (userRole !== 'admin') {
    return next({
      statusCode: 403,
      message: 'Only admins can register new admins',
    });
  }

  const newAdmin = await userService.validateNewUser(name, email, password, userRole);

  return res.status(201).json({ user: { ...newAdmin } });
};

module.exports = {
  createUser,
  createAdmin,
};
