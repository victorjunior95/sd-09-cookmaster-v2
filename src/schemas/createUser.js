const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string()
  .required(),
  email: Joi.string()
    .pattern(new RegExp('[^@]+@[^.]+.com$'))
    .required(),
  password: Joi.string()
  .required(),
});

module.exports = {
  createUser,
};