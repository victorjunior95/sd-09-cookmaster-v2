const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const userValidationSchema = Joi.object({
  name: Joi.string().required()
    .messages({
      'any.required': 'Invalid entries. Try again.',
    }),
  email: Joi.string().email().required()
    .messages({
      'any.required': 'Invalid entries. Try again.',
      'string.email': 'Invalid entries. Try again.',
    }),
  password: Joi.string().required()
    .messages({
      'any.required': 'Invalid entries. Try again.',
    }),
  role: Joi.string(),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'any.required': 'All fields must be filled',
      'string.email': 'Incorrect username or password',
    }),
  password: Joi.string().required()
    .messages({
      'any.required': 'All fields must be filled',
    }),
});

const validationError = (status, message) => ({ status, message });

const createUser = async (user) => {
  const { error } = userValidationSchema.validate(user);
  if (error) throw validationError(400, error.message);
  const emailCheck = await usersModel.emailCheck(user.email);
  if (emailCheck) throw validationError(409, 'Email already registered');
  const newUser = await usersModel.createUser(user);
  return newUser;
};

const newToken = (payload) => {
  const config = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const secret = 'segredoQualquerSoProProjetoFuncionar';
  return jwt.sign(payload, secret, config);
};

const loginUser = async (user) => {
  const { error } = loginValidationSchema.validate(user);
  if (error) throw validationError(401, error.message);
  const loginCheck = await usersModel.loginUser(user);
  if (!loginCheck) throw validationError(401, 'Incorrect username or password');
  const { _id: id, email, role } = loginCheck;
  return newToken({ id, email, role });
};

module.exports = {
  createUser,
  loginUser,
};
