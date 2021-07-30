const Joi = require('joi');
const JWT = require('jsonwebtoken');
const model = require('../models/users');

const secret = 'bomb';
const options = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

function userValidation(name, email, password) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });
  if (error) {
    error.code = 'badRequest';
    throw error;
  }
}

function loginValidation(email, password) {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ email, password });
  if (error) {
    error.code = 'missingFields';
    throw error;
  }
}

async function emailValidation(email) {
  const user = await model.findUser(email);
  if (user) {
    const error = new Error();
    error.code = 'conflict';
    throw error;
  }
}

async function newUser(name, email, password, role) {
  userValidation(name, email, password);
  await emailValidation(email);
  const obj = await model.newUser(name, email, password, role);
  const { password: _, ...result } = obj;
  return result;
}

async function login(email, password) {
  loginValidation(email, password);
  const result = await model.findUser(email, password);
  if (!result) {
    const error = new Error();
    error.code = 'invalidCredentials';
    throw error;
  }
  const { password: _, ...payload } = result;
  const token = JWT.sign(payload, secret, options);
  return token;
}

module.exports = {
  newUser,
  emailValidation,
  login,
};
