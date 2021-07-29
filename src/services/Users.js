const Joi = require('joi');
const JWT = require('jsonwebtoken');
const model = require('../models/Users');
const { SECRET, jwtConfig } = require('../utils/jwtUtils');
  
const validateUser = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });

  if (error) {
    error.statusCode = 'badRequest';
    throw error;
  } 
};

const validateLoginForm = (email, password) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ email, password });
  
  if (error) {    
    error.statusCode = 'fieldNotFound';
    throw error;
  }
};

const findUser = async (email) => {
  const user = await model.findUser(email);
  return user;
};

const createUserValidation = async (email) => {
  const user = await findUser(email);
  if (user) {
    const error = new Error('Email already registered');
    error.statusCode = 'conflict';
    throw error;
  }
};

const createUser = async (name, email, password) => {
  validateUser(name, email, password);
  await createUserValidation(email);
  const result = await model.createUser(name, email, password);
  const { password: _, ...userInfo } = result;
  return userInfo;
};

const isLoginValid = (result) => {
  if (!result) {
    const error = new Error('Incorrect username or password');
    error.statusCode = 'unauthorized';
    throw error;
  }
};

const createToken = (user) => {
  const { password: _, ...payload } = user;
  const token = JWT.sign(payload, SECRET, jwtConfig);
  return { token };
};  

const login = async (email, password) => {
  validateLoginForm(email, password);
  const result = await model.findUser(email, password);
  isLoginValid(result);
  return createToken(result);
};

module.exports = {
  createUser,
  login,
};
