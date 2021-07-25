const Joi = require('joi');
const {
  INVALID_LOGIN_FORMAT,
  INVALID_LOGIN_DATA,
} = require('../Messages/errors');

const { findEmail } = require('../models');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateUser = async (user) => {
  const { error } = userSchema.validate(user);
  if (error) return INVALID_LOGIN_FORMAT;

  const result = await findEmail(user.email);
  if (!result || result.password !== user.password) return INVALID_LOGIN_DATA;

  return true;
};

module.exports = validateUser;
