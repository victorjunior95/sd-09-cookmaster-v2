const Joi = require('joi');
const usersModel = require('../model/usersModel');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateError = (status, message) => ({
  status,
  message,
});

const newUser = async (user) => {
  const { error } = UserSchema.validate(user);
  if (error) throw validateError(400, 'Invalid entries. Try again.');

  const foundEmail = await usersModel.findEmail(user.email);
  if (foundEmail) throw validateError(409, 'Email already registered');

  const registeredUser = await usersModel.registerUser(user);
  return registeredUser;
};

module.exports = { newUser };
