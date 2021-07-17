const usersModels = require('../../models/users');
const { validateUserInfos } = require('./validateUserInfos');

const insertUser = async (name, email, password) => {
  const insertedUser = await usersModels.insertUser(name, email, password);
  if (validateUserInfos(name, email, password)) {
    return validateUserInfos(name, email, password);
  }
  return insertedUser;
};

module.exports = {
  insertUser,
};
