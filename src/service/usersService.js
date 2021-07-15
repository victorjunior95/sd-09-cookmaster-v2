const validations = require('./validations');
const userModel = require('../models/userModel');

const createUser = async (newUser) => {
  await validations.validateNewUser(newUser);
  const newUserRole = {
    ...newUser,
    role: 'user',
  };
  const result = await userModel.createUser(newUserRole);
  return result; 
};

module.exports = {
  createUser,
};
