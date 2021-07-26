const userModel = require('../model/users');

const registerUser = async (newUser) => {
  const response = await userModel.registerUser(newUser);
  if (!response) return { status: 400, payload: 'error' };
  return { status: 201, payload: { user: response } };
};

module.exports = { registerUser };
