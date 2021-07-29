const service = require('../services/Users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { userInfo } = await service.createUser(name, email, password);
  res.status(201).json({ user: userInfo });
};

module.exports = {
  createUser,
};