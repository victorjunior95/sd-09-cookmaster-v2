const Joi = require('joi');

const MINLENGTHPASSWORD = 3;

const validateCredentialsData = (userData) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(MINLENGTHPASSWORD).required(),
  }).validate(userData);

module.exports = {
  validateCredentialsData,
};
