const modelUsers = require('../models/users');

const createUser = async (name, email, password) => {
  const user = await modelUsers.createUser(name, email, password);
  return user;
};

module.exports = {
  createUser,
};
