const Joi = require('joi');

const User = require('../models/users');

const JoiSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().not().empty().required(),
  password: Joi.string().not().empty().required(),
});

const validateError = (statusCode, message) => ({
  statusCode,
  message,
});

const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

module.exports = async (user) => {
  const { error } = JoiSchema.validate(user);

  if (error || !regex.test(user.email)) {
    throw validateError(400, 'Invalid entries. Try again.');
  }

  const findEmail = await User.findByEmail(user.email);

  if (findEmail) {
    throw validateError(409, 'Email already registered');
  }

  const newUser = await User.create(user);
  const { password, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};
