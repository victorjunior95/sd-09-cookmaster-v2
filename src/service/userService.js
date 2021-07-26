const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const userModel = require('../model/userModel');

const schema = Joi.object({
  name: Joi.required(),
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const createUser = async ({ name, email, password, userId }) => {
  const { error } = schema.validate({ name, email, password });
  if (error) {
    return {
      isError: true,
      err: { message: 'Invalid entries. Try again.' },
      status: StatusCodes.BAD_REQUEST,
    }; 
  }
  const existingUser = await userModel.findUser(email);
  if (existingUser) {
    return {
      isError: true,
      err: { message: 'Email already registered' }, 
      status: StatusCodes.CONFLICT,
    }; 
  }
  const result = await userModel.createUser({ name, email, password, userId });
  return result;
};

module.exports = {
  createUser,
};