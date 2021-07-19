// const usersModel = require('../model/usersModel');
const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateError = (status, message) => ({
  status,
  message,
});

const newUser = async (name, email, password) => {
  const { error } = UserSchema.validate(name, email, password);
  if (error) throw validateError(422, error.message);
};

module.exports = { newUser };