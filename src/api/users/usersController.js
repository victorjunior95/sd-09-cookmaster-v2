const UsersService = require('./usersService');

const create = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await UsersService.create({ name, email, password });

  if (user.error) return next(user);

  return res.status(201).json({ user });
};

module.exports = {
  create,
};
