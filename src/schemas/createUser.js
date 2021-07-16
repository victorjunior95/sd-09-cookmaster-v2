const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string()
  .required(),
  email: Joi.string()
    .pattern(new RegExp('[^@]+@[^.]+.com$'))
    .required(),
  password: Joi.string()
  .required(),
});