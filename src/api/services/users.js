const Joi = require('joi');
const { User } = require('../models');
const { InvalidArgumentError, ConflictError } = require('../errors');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  async create(payload) {
    const { error } = UserSchema.validate(payload);

    if (error) {
      throw new InvalidArgumentError('Invalid entries. Try again.');
    }

    const user = new User(payload);
    const response = await user.create();

    if (!response) throw new ConflictError('Email');

    const { password, ...serializedResponse } = response;

    return { user: serializedResponse };
  },
};
