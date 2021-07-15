const usersModels = require('../models/usersModels');

const postNewUser = async (userInfo) => {
  const result = await usersModels.postNewUser(userInfo);

  if (result.name) return { error: { code: 409, message: 'Email already registered' } };

  return result;
};

module.exports = {
  postNewUser,
};