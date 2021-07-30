const service = require('../services/Users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userInfo = await service.createUser(name, email, password);
  res.status(201).json({ user: userInfo });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await service.login(email, password);
  res.status(200).json(token);
};

module.exports = {
  createUser,
  login,
};