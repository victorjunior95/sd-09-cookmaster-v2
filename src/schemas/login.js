const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('[^@]+@[^.]+.com$'))
    .required(),
  password: Joi.string()
    .required(),
});
