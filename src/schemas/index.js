const Joi = require('joi');

const msg = 'Invalid entries. Try again.';
const msgLogin = 'All fields must be filled';

const userSchemas = Joi.object({
  name: Joi.string()
    .messages({
      'string.base': msg,
      'string.empty': msg,
      'any.required': msg,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      'string.base': msg,
      'string.empty': msg,
      'any.required': msg,
    })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .messages({
      'string.base': msg,
      'string.empty': msg,
      'any.required': msg,
    })
    .required(),
});

const loginSchemas = Joi.object({
  email: Joi.string()
    .email()
    .messages({
      'string.base': msgLogin,
      'string.empty': msgLogin,
      'any.required': msgLogin,
    })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .messages({
      'string.base': msgLogin,
      'string.empty': msgLogin,
      'any.required': msgLogin,
    })
    .required(),
});

const recipesSchemas = Joi.object({
  name: Joi.string()
    .messages({
      'string.base': msg,
      'string.empty': msg,
      'any.required': msg,
    })
    .required(),
  ingredients: Joi.string()
    .messages({
      'string.base': msg,
      'string.empty': msg,
      'any.required': msg,
    })
    .required(),
  preparation: Joi.string()
    .messages({
      'string.base': msg,
      'string.empty': msg,
      'any.required': msg,
    })
    .required(),
});

module.exports = { userSchemas, loginSchemas, recipesSchemas };
