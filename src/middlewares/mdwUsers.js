const UsersService = require('../services/UsersServices');
// const status = require('../services/allMessages');

const usersGetAll = async (_req, res, _next) => {
  const data = await UsersService.usersGetAll();
  res.status(200).json(data);
};

const newUserObjectValidator = (req, _res, next) => {
  const { name, email, password } = req.body;
  const data = UsersService.userPatternVerifier(name, email, password);
  if (data.error) { return next(data); }
  return next();
};

const newUserExistsValidator = async (req, _res, next) => {
  const { email } = req.body;
  const data = await UsersService.userExistsVerifier(email);
  if (data.error) { return next(data); }
  return next();
};

const newUserAdd = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userObject = { name, email, password, role: 'user' };
  if (req.headers.authorizarion) userObject.role = 'admin';
  const data = await UsersService.userAdd(userObject);
  if (data.error) { return next(data); }
  return res.status(201).json(data);
};

module.exports = {
  usersGetAll,
  newUserObjectValidator,
  newUserExistsValidator,
  newUserAdd };
