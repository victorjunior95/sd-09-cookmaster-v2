const Joi = require('joi');
const model = require('../models/Users');

const validateUser = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });

  if (error) throw error;
};

const findUser = async (email) => {
  const user = await model.findUser(email);
  return user;
};

const createUserValidation = async (email) => {
  const user = await findUser(email);
  if (user) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }
};

const createUser = async (name, email, password) => {
  validateUser(name, email, password);
  await createUserValidation(email);
  const result = await model.createUser(name, email, password);
  const { password: _, ...userInfo } = result;
  return userInfo;
};

module.exports = {
  createUser,
};
