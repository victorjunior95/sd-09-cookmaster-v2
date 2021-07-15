const UserModel = require('../models/UsersModel');

const createUser = async (name, email, password) => {
  const { insertedId } = await UserModel.createUser(name, email, password);
  return {
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  };
};

module.exports = {
  createUser,
};