const Joi = require('joi');

const {
  createUser,
  getByEmail,
} = require('../models/userModel');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const createUserService = async ({ name, email, password, role }) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) throw validateError(400, 'Invalid entries. Try again.');

  const userByEmail = await getByEmail(email);
  if (userByEmail.length > 0) throw validateError(409, 'Email already registered');

  const idObject = await createUser({ name, email, password, role });
  return idObject;
};

module.exports = {
  createUserService,
};