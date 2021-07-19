const UsersModel = require('../models/userModel');

const getAllUsers = async () => UsersModel.getAll();

const createUser = async (name, email, password) => {
  const create = await UsersModel.create(name, email, password);
  return create;
};

module.exports = {
  getAllUsers,
  createUser,
};
