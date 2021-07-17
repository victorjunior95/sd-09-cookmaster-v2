const Joi = require('joi');
const models = require('../models');
const { createToken } = require('../jwt');

const validateLogin = (userData) =>
  Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(userData);

module.exports = async (userData) => {
  const { error } = validateLogin(userData);
  if (error) throw (Error('All fields must be filled'));

  const result = await models.login(userData);

  if (!result) throw (Error('Incorrect username or password'));

  const { _id, email, role } = result;
  const token = await createToken({ _id, email, role });

  return { token };
};
