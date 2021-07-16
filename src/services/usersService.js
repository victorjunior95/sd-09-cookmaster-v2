const usersModel = require('../models/usersModel');

const validateFields = (name, email, password) => {
  const regex = /(\S*)@(\w*)(\.\w*){1,2}/i;

  if (!name || !email || !password || !email.match(regex)) return false;

  return { name, email, password };
};

module.exports = {
  validateUser: async (name, email, password) => {
    if (!validateFields(name, email, password)) {
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

  findAllUsers: async () => usersModel.listAllUsers(),
};
