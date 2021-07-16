const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string()
  .required(),
  ingredients: Joi.string()
    .required(),
  preparation: Joi.string()
  .required(),
});