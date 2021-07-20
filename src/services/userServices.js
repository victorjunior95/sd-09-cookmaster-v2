const usersModel = require('../models/usersModel');
const validation = require('../utils/validations');

module.exports = {
  validateUser: async (name, email, password) => {
    if (!validation.validateFields(name, email, password)) {
      return {
        status: 400,
        message: 'Invalid entries. Try again.',
      };
    }

    const finded = await usersModel.listUserByEmail(email);

    if (finded) {
      return {
        status: 409,
        message: 'Email already registered',
      };
    }

    return usersModel.addUser(name, email, password);
  },

  findAllUsers: async () => {
    const listAllUsers = await usersModel.listAllUsers();

    return listAllUsers;
  },

  findOneUser: async (email) => {
    const listUserByEmail = await usersModel.listUserByEmail(email);

    return listUserByEmail;
  },

  checkingLogin: async (email, password) => {
    if (!email || !password) {
      return {
        status: 401,
        message: 'All fields must be filled',
      };
    }

    const listByEmailAndPassword = await usersModel.listByEmailAndPassword(email, password);

    if (!listByEmailAndPassword) {
      return { status: 401, message: 'Incorrect username or password' };
    }

    return listByEmailAndPassword;
  },
};
