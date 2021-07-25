const joi = require('joi');

const create = joi.object({
  name: joi
    .string()
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .required(),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = {
  create,
  login,
};