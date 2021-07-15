const Joi = require('joi');
const model = require('../models/users.js');

const UserSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().not().empty().required(),
  password: Joi.string().not().empty().required(),
  role: Joi.string(),
});

const create = async (user) => {
  const { error } = UserSchema.validate(user, { convert: false });
  if (error) {
    return { err: { code: 'invalid_data', message: 'Invalid entries. Try again' } };
  }
  const usedEmail = await model.findByEmail(user.email);
  if (usedEmail) return { err: { code: 'existing_email', message: 'Email already registered' } };
  return model.create(user);
};

module.exports = { create };
