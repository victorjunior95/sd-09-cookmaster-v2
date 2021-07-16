const userModel = require('../models/userModel');

const registerUser = async (name, email, password) => {
  const user = await userModel.findUser(email);
  if (user) {
    const objectError = {
      code: 409,
      message: 'Email already registered',
    };
    throw objectError;
  }
  const { password: _, ...newUser } = await userModel.registerNewUser(name, email, password);
  return {
    user: newUser,
  };
};

module.exports = {
  registerUser,
};
