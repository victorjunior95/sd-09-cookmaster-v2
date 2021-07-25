const Joi = require('joi');
const searchEmail = require('./searchEmail');

const {
  INVALID_NEW_USER,
} = require('../Messages/errors');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).required(),
  password: Joi.string().min(4).required(),
});

const validateNewUser = async (user) => {
  const { error } = userSchema.validate(user);
  if (error) return INVALID_NEW_USER;

  const findEmail = await searchEmail(user.email);
  if (findEmail !== true) return findEmail;

  return true;
};

module.exports = validateNewUser;
