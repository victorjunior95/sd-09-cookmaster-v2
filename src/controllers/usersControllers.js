const usersServices = require('../services/usersServices');

const CONFLICT = 409;
const CREATED = 201;
const OK = 200;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await usersServices.createUser(name, email, password);

  if (newUser.message) return res.status(CONFLICT).json(newUser);

  return res.status(CREATED).json(newUser);
};

const login = async (req, res) => {
  const { token } = req;

  return res.status(OK).json({ token });
};

module.exports = {
  createUser,
  login,
};
