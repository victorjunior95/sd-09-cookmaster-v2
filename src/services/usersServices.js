const usersModels = require('../models/usersModels');

const createUser = async (name, email, password) => {
  const userByEmail = await usersModels.getByEmail({ email });

  if (userByEmail) return { message: 'Email already registered' };

  const newUser = await usersModels.createUser(name, email, password);

  return newUser;
};

module.exports = {
  createUser,
};
