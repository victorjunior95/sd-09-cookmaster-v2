const users = require('../models/users');
const validate = require('../utils/validators');

const create = async (userInfo, role) => {
  try {
      await validate.user(userInfo);
      await validate.userExists(userInfo);
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  const response = await users.create(userInfo, role);
  const { password, ...user } = response;
  return {
    status: 201,
    user,
  };
};

module.exports = { create };