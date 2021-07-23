const Joi = require('joi');
const UserModel = require('../models/UserModel');

const validateUserData = (data) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }).validate(data);
  if (error) {
    throw new Error('invalid_data');
  }
};

const validateEmail = async (email) => {
  const isValid = /\S+@\S+\.\S+/.test(email);
  if (!isValid) {
    throw new Error('invalid_data');
  }
  const user = await UserModel.getByEmail(email);
  if (user) {
    throw new Error('invalid_email');
  }
};

const create = async (data) => {
  validateUserData(data);
  await validateEmail(data.email);
  return UserModel.create(data);
};

module.exports = {
  create,
};
