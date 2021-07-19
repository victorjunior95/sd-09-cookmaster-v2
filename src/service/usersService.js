const validations = require('./validations');
const userModel = require('../models/userModel');
const { onlyAdminAllowed } = require('./errorsMessages');

const createUser = async (newUser) => {
  await validations.validateNewUser(newUser);
  const newUserRole = {
    ...newUser,
    role: 'user',
  };
  const result = await userModel.createUser(newUserRole);
  return result; 
};

const createAdmin = async (newAdmin, user) => {
  await validations.validateNewUser(newAdmin);
  if (user.role !== 'admin') throw onlyAdminAllowed;
  const newAdminRole = {
    ...newAdmin,
    role: 'admin',
  };
  const result = await userModel.createUser(newAdminRole);
  return result;
};

module.exports = {
  createUser,
  createAdmin,
};
