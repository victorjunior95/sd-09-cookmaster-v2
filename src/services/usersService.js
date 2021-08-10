const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const SECRET = 'cookmastersecret';

const jwtConfig = {
  expiresIn: '6000m',
  algorithm: 'HS256',
};

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const CONFLICT_STATUS = 409;
const msg400 = 'Invalid entries. Try again.';
const msg401notFilled = 'All fields must be filled';
const msg401noPassword = 'Incorrect username or password';
const msg409 = 'Email already registered';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerUserServices = async (user) => {
  const validateEmail = await usersModel.findByEmail(user);
  const validateUser = userSchema.validate(user);
  
  if (validateUser.error) {
    return { status: BAD_REQUEST_STATUS, result: { message: msg400 } };
  }
  
  if (validateEmail) {
    return { status: CONFLICT_STATUS, result: { message: msg409 } };
  }

  const result = await usersModel.registerUserModels(user);

  return { status: CREATED_STATUS, result };
};

const userLoginServices = async (login) => {
  const validateLogin = loginSchema.validate(login);
  if (validateLogin.error) {
    return { status: UNAUTHORIZED_STATUS, result: { message: msg401notFilled } };
  }

  const user = await usersModel.findByEmail(login);
  if (!user || user.password !== login.password) {
    return { status: UNAUTHORIZED_STATUS, result: { message: msg401noPassword } };
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);
  return { status: OK_STATUS, result: { token } };
};

module.exports = {
  registerUserServices,
  userLoginServices,
};
