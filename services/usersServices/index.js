const usersModels = require('../../models/users');
const { validateUserInfos, validateRegisteredEmail } = require('./validateUserInfos');

const insertUser = async (name, email, password) => {
  const insertedUser = await usersModels.insertUser(name, email, password);
  if (validateUserInfos(name, email, password)) {
    return validateUserInfos(name, email, password);
  }
  if (validateRegisteredEmail(email)) {
    return validateRegisteredEmail(email);
  }
  return insertedUser;
};

module.exports = {
  insertUser,
};
