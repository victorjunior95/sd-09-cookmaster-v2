const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../model/usersModel');
const { validateError } = require('./validateError');

const secret = 'tokensecreto';

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validateLogin = async (user) => {
  if (!user.email || !user.password) throw validateError(401, 'All fields must be filled');
  
  const { error } = LoginSchema.validate(user);
  const foundEmail = await usersModel.findEmail(user.email);
  if (error || foundEmail === null) throw validateError(401, 'Incorrect username or password');

  const jwtConfig = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

module.exports = { validateLogin };
