const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const JWT_SECRET = 'cookmaster';
const JWT_CONFIG = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const validateUserData = (data) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }).validate(data);
  if (error) {
    throw new Error('invalid_data');
  }
};

const validateEmail = async (email) => {
  const isValid = /\S+@\S+\.\S+/.test(email);
  if (!isValid) {
    throw new Error('invalid_data');
  }
  const user = await UserModel.getByEmail(email);
  if (user) {
    throw new Error('invalid_email');
  }
};

const validateLoginData = (data) => {
  const { error } = Joi.object({
    email: Joi.required(),
    password: Joi.required(),
  }).validate(data);
  if (error) {
    throw new Error('invalid_input');
  }
};

const create = async (data) => {
  validateUserData(data);
  await validateEmail(data.email);
  return UserModel.create(data);
};

const auth = async (data) => {
  validateLoginData(data);
  const user = await UserModel.auth(data);
  if (!user) {
    throw new Error('invalid_login');
  }
  const { email, _id, role } = user;
  const payload = {
    email,
    id: _id,
    role,
  };
  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
  return token;
};

const createAdmin = async (data) => {
  validateUserData(data);
  await validateEmail(data.email);
  return UserModel.createAdmin(data);
};

module.exports = {
  create,
  auth,
  createAdmin,
};
