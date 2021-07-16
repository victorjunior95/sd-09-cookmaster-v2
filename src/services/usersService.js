const usersModel = require('../models/usersModel');

const createUser = async (user) => {
  const result = await usersModel.createUser(user);

  return { result, status: 201 };
};

module.exports = {
  createUser,
};
