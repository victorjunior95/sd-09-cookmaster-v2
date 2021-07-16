const Joi = require('@hapi/joi');
const User = require('../Models/usersModel');

const schemaUser = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).required(),
  password: Joi.required(),
});

const validateUserData = (code, message) => ({ code, message });

const userCreate = async (email, name, password) => {
  const { error } = schemaUser.validate({ email, name, password });
  if (error) {
    throw validateUserData(400, 'Invalid entries. Try again.');
  }
  const getUserByEmail = await User.getOne(email);
  if (getUserByEmail) {
    throw validateUserData(409, 'Email already registered');
  }
  const user = await User.userCreate(email, name, password);
  return { user };
};

module.exports = {
  userCreate,
};
