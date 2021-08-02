const service = require('../services/Users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userInfo = await service.createUser(name, email, password);
  return res.status(201).json({ user: userInfo });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await service.login(email, password);
  return res.status(200).json(token);
};

const newAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;
  if (role !== 'admin') {
    const error = new Error();
    error.statusCode = 'invalidUser';
    throw error;
  }
  const result = await service.newAdmin(name, email, password);
  res.status(201).json({ user: result });
};

module.exports = {
  createUser,
  login,
  newAdmin,
};