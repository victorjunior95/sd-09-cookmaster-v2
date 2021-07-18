const usersModels = require('../../models/users');
const { validateUserInfos } = require('./validateUserInfos');

const insertUser = async (name, email, password) => {
  const validateUserInfosErr = validateUserInfos(name, email, password);
  if (validateUserInfosErr) {
    return validateUserInfosErr;
  }
  const insertedUser = await usersModels.insertUser(name, email, password);
  return insertedUser;
};

const getUserByEmail = async (email) => {
  const registeredEmail = await usersModels.getUserByEmail(email);
  return registeredEmail;
};

module.exports = {
  insertUser,
  getUserByEmail,
};
