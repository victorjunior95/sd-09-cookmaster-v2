const joi = require('joi');
const jwt = require('jsonwebtoken');
const {
  registerUser,
  findUserByEmail,
} = require('../models/usersModel');

const secret = 'valhallaawaits';

const errorEmailExists = { message: 'Email already registered' };
const errorInvalidEntries = { message: 'Invalid entries. Try again.' };
const errorLoginCredentials = { message: 'All fields must be filled' };
const errorIncorrectLogin = { message: 'Incorrect username or password' };

// Validacoes

const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

const verifyUser = (user) => (
  joi.object({
    name: joi.string().required(),
    email: joi.string().pattern(emailRegex).required(),
    password: joi.string().required(),
    role: joi.string(),
  }).validate(user)
);

const removePasswordAndNameFromUser = (user) => {
  const { password, name, ...userNecessaryInfos } = user;
  return userNecessaryInfos;
};

// 

const registerUserService = async (user) => {
  const { error } = verifyUser(user);
  if (error) {
    return { code: 400, response: errorInvalidEntries };
  }
  const { email } = user;
  const emailExists = await findUserByEmail(email);
  if (emailExists) {
    return { code: 409, response: errorEmailExists };
  }
  const userWithRole = user;
  if (!user.role) {
    userWithRole.role = 'user';
  }
  const registeredUser = await registerUser(userWithRole);
  const { password, ...userNecessaryInfos } = registeredUser;
  
  return { code: 201, response: userNecessaryInfos };
};

const loginService = async (userCredentials) => {
  const { email, password } = userCredentials;
  if (!email || !password) {
    return { code: 401, response: errorLoginCredentials };
  }
  const user = await findUserByEmail(email);
  if (!user || password !== user.password) {
    return { code: 401, response: errorIncorrectLogin };
  } 

  const payload = removePasswordAndNameFromUser(user);
  const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

  const token = jwt.sign(payload, secret, jwtConfig);
  return { code: 200, response: { token } };
};

module.exports = {
  registerUserService,
  loginService,
};
