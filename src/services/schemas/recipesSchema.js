const Joi = require('@hapi/joi');

const validateError = (status, message) => ({
  status,
  message,
});

const schema = Joi.object({
  name: Joi.required().messages({ 'any.required': 'Invalid entries. Try again.' }),
  ingredients: Joi.required().messages({ 'any.required': 'Invalid entries. Try again.' }),
  preparation: Joi.required().messages({ 'any.required': 'Invalid entries. Try again.' }),
});

module.exports = { validateError, schema };
