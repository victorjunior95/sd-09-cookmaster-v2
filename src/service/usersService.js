const validations = require('./validations');
const userModel = require('../models/userModel');
const { findUserByEmail } = require('../models/userModel');
const { emailRegisteredError } = require('./errorsMessages');

const createUser = async (newUser) => {
  validations.validateNewUser(newUser);
  const newUserRole = {
    ...newUser,
    role: 'user',
  };
  const emailRegistered = await findUserByEmail(newUser.email);
  if (emailRegistered) throw emailRegisteredError;
  const result = await userModel.createUser(newUserRole);
  return result; 
};

module.exports = {
  createUser,
};
