const users = require('../models/users');

const create = async (userInfo, role) => {
  const response = await users.create(userInfo, role);
  const { password, ...user } = response;
  return {
    status: 201,
    user,
  };
};

module.exports = { create };