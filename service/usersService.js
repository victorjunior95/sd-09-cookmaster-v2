const userModel = require('../models/usersModel');

const validateDataRegister = (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    const erro = {
        status: 400,
        message: 'Invalid entries. Try again.',
      };
    throw erro;
  }
};

const emailValidator = async (email) => {
  const regex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!regex) {
    const erro = {
      status: 400,
      message: 'Invalid entries. Try again.',
    };
    throw erro;
  }
  const emailExists = await userModel.findEmail(email);
  if (emailExists !== null) {
    const erro = {
      status: 409,
      message: 'Email already registered',
    };
  throw erro;
  }
};

const userRegisterService = async (userData) => {
  validateDataRegister(userData);
  await emailValidator(userData.email);
  const newUser = await userModel.userRegisterModel(userData);
  const { name, email, role, _id } = newUser.ops[0];
  const userWithouPass = {
    user: {
      name,
      email,
      role,
      _id,
    },
  };
  return userWithouPass;
};

module.exports = {
  userRegisterService,
};
