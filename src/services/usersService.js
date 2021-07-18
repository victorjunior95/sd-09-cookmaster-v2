const Joi = require('@hapi/joi');

const usersModel = require('../models/usersModel');

const userSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.' }),
  email: Joi.string().email().required().messages({
    'any.required': 'Invalid entries. Try again.',
    'any.email': 'Invalid entries. Try again.'
  }),
  password: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.'}),
});

const validateError = (status, message) => ({
  status,
  message,
});

const createUser = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) throw validateError(400, error.message);

  const fetchedEmail = await usersModel.findEmail(user.email);

  if (fetchedEmail) throw validateError(409, 'Email already registered');

  const result = await usersModel.createUser(user);

  return { result, status: 201 };
};

module.exports = {
  createUser,
};
