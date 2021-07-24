const Joi = require('@hapi/joi');
const User = require('../model/userModel');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).required(),
  password: Joi.required(),
});

const userValidation = (code, message) => ({ code, message });

const createUserService = async (email, name, password) => {
  const { error } = userSchema.validate({ email, name, password });
  if (error) {
    throw userValidation(400, 'Invalid entries. Try again.');
  }
  const getByEmail = await User.getOneUser(email);
  if (getByEmail) {
    throw userValidation(409, 'Email already registered');
  }
  const user = await User.createNewUser(email, name, password);
  return { user };
};

module.exports = {
  createUserService,
};
