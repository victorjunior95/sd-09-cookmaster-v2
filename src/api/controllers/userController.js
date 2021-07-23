const userService = require('../services/userService');

const stateBadRequest = 400;
const stateOk = 200;

const createNewUser = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const stateCreated = 201;
  const stateConflict = 409;
  const newUser = await userService.createUser(name, email, password);

  if (newUser.message === 'Email already registered') {
    return res.status(stateConflict).json(newUser);
  }

  if (newUser.message) return res.status(stateBadRequest).json(newUser);

  return res.status(stateCreated).json(newUser);
};

const enterUseLogin = async (req, res, _next) => {
  const { email, password } = req.body;
  const logon = await userService.useLoguin(email, password);


  return res.status(stateOk).json(logon);
};

module.exports = {
  createNewUser,
  enterUseLogin,
};