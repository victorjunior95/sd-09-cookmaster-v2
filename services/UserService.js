const Joi = require('joi');
const UserModel = require('../models/UserModel');

const schemaUser = Joi.object({
  name: Joi.required(),
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const errorHandling = (status, message) => ({
  status,
  message,
});

const create = async (name, email, password) => {
  const getByEmail = await UserModel.getByEmail(email);

  if (getByEmail) {
    throw errorHandling(409, 'Email already registered');
  }

  const { error } = schemaUser.validate({ name, email, password });

  if (error) {
    throw errorHandling(400, 'Invalid entries. Try again.');
  }

  const user = await UserModel.create(name, email, password);

  return user;
};

module.exports = {
  create,
};