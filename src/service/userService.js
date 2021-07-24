const Joi = require('@hapi/joi');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const createUserSchm = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).required(),
  password: Joi.required(),
});

const loginUserSchm = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const userValidation = (code, message) => ({ code, message });

const createUserService = async (email, name, password) => {
  const { error } = createUserSchm.validate({ email, name, password });
  if (error) {
    throw userValidation(400, 'Invalid entries. Try again.');
  }
  const getByEmail = await User.getOneUser(email);
  if (getByEmail) {
    throw userValidation(409, 'Email already registered');
  }
  const user = await User.createNewUser(email, name, password);
  return { user };
};

const validateUserData = (code, message) => ({ code, message });

const userLoginService = async (email, password) => {
  const { error } = loginUserSchm.validate({ email, password });
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

  const secretToken = 'tokensupersecreto';
  /*const secretToken = 'dale na narguinas';*/

  const token = jwt.sign({ data: user }, secretToken, jwtConfig);

  return { token };
};

module.exports = {
  createUserService,
  userLoginService,
};
