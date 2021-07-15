// const { ObjectId } = require('mongodb');
const Joi = require('joi');
const userModel = require('../models/userModel');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const create = async ({ name, email, password, role }) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) throw validateError(400, 'Invalid entries. Try again.');
  const userByEmail = await userModel.getByEmail(email);
  if (userByEmail.length > 0) throw validateError(409, 'Email already registered');

  const idObject = await userModel.create({ name, email, password, role });
  return idObject;
};

const login = async ({ email, password }) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw validateError(401, 'All fields must be filled');
  const userByEmail = await userModel.getByEmail(email);
  if (!userByEmail.length) throw validateError(401, 'Incorrect username or password');
  const passwordValid = password === userByEmail[0].password;
  if (!passwordValid) throw validateError(401, 'Incorrect username or password');
  const { _id } = userByEmail[0];
  return {
    _id,
    role: userByEmail[0].role,
  };
};

module.exports = {
  create,
  login,
};