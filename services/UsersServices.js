const joi = require('joi');
const usersModel = require('../models/usersModel');
const response = require('../middlewares/responseCodes');

const USER_SCHEMA = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const getAllUsers = async () => usersModel.getAllUsers();

const createNewUser = (newUser) => {
  const isUserValid = USER_SCHEMA.validate(newUser);
  console.log(isUserValid.error);
  if (isUserValid.error) {
    const errorObj = {
      errorCode: response.BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    };
    return errorObj;
  }
  return usersModel.createNewUser(newUser);
};

module.exports = {
  getAllUsers,
  createNewUser,
};