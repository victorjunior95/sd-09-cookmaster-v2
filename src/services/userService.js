const Joi = require('joi');
const userModel = require('../models/userModel');

const validateUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const create = async ({ name, email, password, role }) => {
  const { error } = validateUser.validate({ name, email, password });
  if (error) return { error: 'Invalid entries. Try again.', status: 400 };

  const userByEmail = await userModel.getUserByEmail(email);
  if (userByEmail.length > 0) return { error: 'Email already registered', status: 409 };

  return userModel.create({ name, email, password, role });
};

const login = async ({ email, password }) => {
  const { error } = validateLogin.validate({ email, password });
  if (error) return { error: 'All fields must be filled', status: 401 };
  const userByEmail = await userModel.getUserByEmail(email);
  if (!userByEmail.length) return { error: 'Incorrect username or password', status: 401 };

  if (password !== userByEmail[0].password) {
    return { error: 'Incorrect username or password', status: 401 };
  }
  const { _id } = userByEmail[0];
  return {
    _id,
    role: userByEmail[0].role,
  };
};

module.exports = {
  create,
  login,
};