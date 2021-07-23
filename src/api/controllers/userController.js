const userService = require('../services/userService');

const stateBadRequest = 400;
const stateUnauthorized = 401;
const stateOk = 200;
const stateCreated = 201;

const createNewUser = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const stateConflict = 409;
  const newUser = await userService.createUser(name, email, password);

  if (newUser.message === 'Email already registered') {
    return res.status(stateConflict).json(newUser);
  }

  if (newUser.message) {
    newUser.message = 'Invalid entries. Try again.';
    return res.status(stateBadRequest).json(newUser);
  }

  return res.status(stateCreated).json(newUser);
};

const enterUseLogin = async (req, res, _next) => {
  const { email, password } = req.body;
  const logon = await userService.useLoguin(email, password);

  if (logon.message) return res.status(stateUnauthorized).json(logon);
  
  return res.status(stateOk).json(logon);
};

const createNewAdmin = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const stateForbidden = 403;
  const newAdmin = await userService.createUserAdmin(name, email, password);
  const { role } = req.user;

  if (role !== 'admin') { 
    return res.status(stateForbidden).json({ message: 'Only admins can register new admins' });
  }

  if (newAdmin.message) {
    newAdmin.message = 'Invalid entries. Try again.';
    return res.status(stateForbidden).json(newAdmin);
  }

  return res.status(stateCreated).json(newAdmin);
};

module.exports = {
  createNewUser,
  enterUseLogin,
  createNewAdmin,
};