const usersModel = require('../models/usersModel');

const createUser = async ({ name, email, password }) => {
  const newUser = await usersModel.createUser({ name, email, password });
  return newUser;
};

module.exports = { createUser };