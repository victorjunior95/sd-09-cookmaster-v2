const usersServices = require('../services/usersServices');


const createUser = async (req, res) => {
  const CONFLICT = 409;
  const CREATED = 201;
  const { name, email, password } = req.body;

  const newUser = await usersServices.createUser(name, email, password);

  if (newUser.message) return res.status(CONFLICT).json(newUser)

  return res.status(CREATED).json(newUser);
};

module.exports = { createUser };
