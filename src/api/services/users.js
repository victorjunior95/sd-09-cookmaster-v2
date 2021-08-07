const users = require('../models/users');
const generateToken = require('../utils/generateToken');
const validate = require('../utils/validators');

const create = async (userInfo, role) => {
  try {
      await validate.user(userInfo);
      await validate.userExists(userInfo);
    } catch (error) {
      return error;
    }
  const response = await users.create(userInfo, role);
  const { password, ...user } = response;
  return {
    status: 201,
    user,
  };
};

const login = async ({ email, password }) => {
  try {
    await validate.login(email, password);
  } catch (error) {
    return error;
  }
  const { token } = await generateToken(email);
  return {
    status: 200,
    token,
  };
};

module.exports = { create, login };