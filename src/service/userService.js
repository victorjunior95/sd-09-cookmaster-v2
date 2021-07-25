const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const userSchm = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).required(),
  password: Joi.required(),
});

const loginSchm = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const dataErr = (code, message) => ({ code, message });

const createUserService = async (email, name, password) => {
  const { error } = userSchm.validate({ email, name, password });
  if (error) {
    throw dataErr(400, 'Invalid entries. Try again.');
  }
  const getUser = await User.getUserByEmail(email);
  if (getUser) {
    throw dataErr(409, 'Email already registered');
  }
  const user = await User.createNewUser(email, name, password);
  return { user };
};

const userLoginService = async (email, password) => {
  const { error } = loginSchm.validate({ email, password });
  if (error) {
    throw dataErr(401, 'All fields must be filled');
  }
  const user = await User.userLoginModel(email, password);
  if (!user) {
    throw dataErr(401, 'Incorrect username or password');
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const secret = 'tokensupersecreto';
  /* const test = 'narguinas' */
  const token = jwt.sign(user, secret, jwtConfig);

  return { token };
};

module.exports = {
  createUserService,
  userLoginService,
};
