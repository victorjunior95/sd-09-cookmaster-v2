const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/usersModels');

const dataValidation = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().required(),
});

const secret = 'pipocin';

const validateUser = async (loginData) => {
  const { email } = loginData;
  const userData = await getUserByEmail(email);
  if (!userData) {
    return { error: 'Incorrect username or password', status: 401 };
  }
  const { password } = userData;
  if (loginData.password !== password) {
    return { error: 'Incorrect username or password', status: 401 };
  }

  return userData;
};

const validateErrors = async (loginData) => {
  const { error } = dataValidation.validate(loginData);
  
  if (error) return { error: 'All fields must be filled', status: 401 };

  return null;
};

const generateToken = async (userData) => {
  const { _id, email } = userData;

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { _id, email } }, secret, jwtConfig);
  return token;
}; 

const loginService = async (loginData) => {
  const error = await validateErrors(loginData);
  if (error) return error;

  const userData = await validateUser(loginData);
  if (userData.error) return userData;

  const { password: _, ...userDataWithoutPassword } = userData;
  const token = await generateToken(userDataWithoutPassword);
  return { token };
};

module.exports = {
  loginService,
};