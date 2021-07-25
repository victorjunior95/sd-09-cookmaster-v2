const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const dataErr = require('../helpers/index');

const loginUserSchm = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const createUserSchm = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).required(),
  password: Joi.required(),
}); 

const createUserService = async (email, name, password) => {
  const { error } = createUserSchm.validate({ email, name, password });
  if (error) {
    throw dataErr(400, 'Invalid entries. Try again.');
  }
  const getByEmail = await User.getOneUser(email);
  if (getByEmail) {
    throw dataErr(409, 'Email already registered');
  }
  const user = await User.createNewUser(email, name, password);
  return { user };
};
  
const userLoginService = async (email, password) => {
  const { error } = loginUserSchm.validate({ email, password });
  if (error) {
    throw dataErr(401, 'All fields must be filled');
  }
  const user = await User.userLogin(email, password);
  if (!user) {
    throw dataErr(401, 'Incorrect username or password');
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const secretToken = 'tokensupersecreto';
  const token = jwt.sign({ data: user }, secretToken, jwtConfig);
  /* const secretToken = 'dale na narguinas'; */
  return { token };
};

module.exports = {
  createUserService,
  userLoginService,
};
