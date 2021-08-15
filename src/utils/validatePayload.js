const Joi = require('joi');

const MINLENGTH = 3;

const validateCredentialsData = (userData) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(MINLENGTH).required(),
  }).validate(userData);

module.exports = {
  validateCredentialsData,
};
