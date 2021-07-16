const UsersService = require('../services/UsersServices');

const usersGetAll = async (_req, res, _next) => {
  const data = await UsersService.usersGetAll();
  res.status(200).json(data);
};

const newUserObjectValidator = (req, _res, next) => {
  const { name, email, password } = req.body;
  const data = UsersService.userPatternVerifier(name, email, password);
  req.body = { newName: name, newEmail: email, newPassword: password };
  if (data.error) { return next(data); }
  return next();
};

const newUserExistsValidator = async (req, _res, next) => {
  const { newEmail } = req.body;
  const data = await UsersService.userExistsVerifier(newEmail);
  if (data.error) { return next(data); }
  return next();
};

const newUserAdd = async (req, res, next) => {
  const { newName, newEmail, newPassword } = req.body;
  const userObject = { name: newName, email: newEmail, password: newPassword, role: 'user' };
  const data = await UsersService.userAdd(userObject);
  if (data.error) { return next(data); }
  return res.status(201).json(data);
};

const newUserAdminAdd = async (req, res, next) => {
  const { newName, newEmail, newPassword, role } = req.body;
  const userAdminObject = { name: newName, email: newEmail, password: newPassword, role };
  const data = await UsersService.userAdminAdd(userAdminObject);
  if (data.error) { return next(data); }
  return res.status(201).json(data);
};

module.exports = {
  usersGetAll,
  newUserObjectValidator,
  newUserExistsValidator,
  newUserAdd,
  newUserAdminAdd,
};
