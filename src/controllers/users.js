const Users = require('../services/users');

const create = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const newUser = await Users.create({ name, email, password, role });

  if (newUser.error) return next(newUser);

  const { password: _, ...user } = newUser;

  res.status(201).json({ user });
};

module.exports = {
  create,
};