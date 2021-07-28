const usersServices = require('../services/users');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { name, email, password, role: 'user' };
  const result = await usersServices.registerUser(newUser);
  res.status(result.status).send(result.payload);
};

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { name, email, password, role: 'admin' };
  const result = await usersServices.registerUser(newUser);
  res.status(result.status).send(result.payload);
};

module.exports = { registerUser, registerAdmin };