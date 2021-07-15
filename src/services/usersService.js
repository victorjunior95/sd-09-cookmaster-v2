const usersModel = require('../models/usersModel');

const createUser = async (name, email, password) => {
  const user = await usersModel.createUser(name, email, password);
  return user;
};

const getUserByEmail = async (email) => {
  const userEmail = await usersModel.getUserByEmail(email);

  return userEmail;
};

module.exports = {
  createUser,
  getUserByEmail,
};