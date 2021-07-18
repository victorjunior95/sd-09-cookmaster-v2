const Joi = require('joi');
const { User } = require('../models');
const { InvalidArgumentError, ConflictError, AccessError } = require('../errors');
const tokens = require('../tokens');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const LoginSchema = Joi.object({
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
  async login(payload) {
    const { error } = LoginSchema.validate(payload);

    if (error) throw new AccessError('All fields must be filled');

    const user = new User(payload);
    const userDB = await user.verify();

    if (!userDB) throw new AccessError('Incorrect username or password');

    const token = tokens.access.create(userDB);
    return { token };
  },
};
