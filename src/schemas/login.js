const Joi = require('joi');

const login = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('[^@]+@[^.]+.com$'))
    .required(),
  password: Joi.string()
    .required(),
});

module.exports = {
  login,
};
