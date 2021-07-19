const Joi = require('@hapi/joi');

const validateError = (status, message) => ({
  status,
  message,
});

const schema = Joi.object({
  email: Joi.required().messages({ 'any.required': 'All fields must be filled' }),
  password: Joi.required().messages({ 'any.required': 'All fields must be filled' }),
});

module.exports = { validateError, schema };
