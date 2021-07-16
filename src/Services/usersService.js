const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const User = require('../Models/usersModel');

const schemaUserCreate = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).required(),
  password: Joi.required(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const validateUserData = (code, message) => ({ code, message });

const userCreate = async (email, name, password) => {
  const { error } = schemaUserCreate.validate({ email, name, password });
  if (error) {
    throw validateUserData(400, 'Invalid entries. Try again.');
  }
  const getUserByEmail = await User.getOne(email);
  if (getUserByEmail) {
    throw validateUserData(409, 'Email already registered');
  }
  const user = await User.userCreate(email, name, password);
  return { user };
};

const userLogin = async (email, password) => {
  const { error } = schemaUserLogin.validate({ email, password });
  if (error) {
    throw validateUserData(401, 'All fields must be filled');
  }
  const user = await User.userLogin(email, password);
  if (!user) {
    throw validateUserData(401, 'Incorrect username or password');
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const secret = 'tokensupersecreto';

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return { token };
};

module.exports = {
  userCreate,
  userLogin,
};
