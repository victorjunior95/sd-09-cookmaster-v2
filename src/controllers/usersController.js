const users = require('../services/usersService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await users.create({ name, email, password, role: 'user' });
  return res.status(201).json(result);
};

module.exports = {
  create,
};
