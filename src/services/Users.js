const Joi = require('joi');
const jwt = require('jsonwebtoken');
const KEY = require('../utils/secret');

const usersModel = require('../models/Users');

const CONFLICT_REQUEST = {
  message: 'Email already registered',
  status: 409,
};

const BAD_REQUEST = {
  message: 'Invalid entries. Try again.',
  status: 400,
};

const UNAUTHORIZED = {
  message: 'All fields must be filled',
  status: 401,
};

const USER_INCORRECT = {
  message: 'Incorrect username or password',
  status: 401,
};

const OK = 200;

const schemaRegister = Joi.object({
  nameOfUser: Joi.string().required(),
  emailOfUser: Joi.string().email({
    minDomainSegments: 2, tlds: { allow: ['com', 'net'] },
  }).required(),
  passwordOfUser: Joi.string().required(),
});

const schemaLogin = Joi.object({
  emailOfUser: Joi.string().email({
    minDomainSegments: 2, tlds: { allow: ['com', 'net'] },
  }).required(),
  passwordOfUser: Joi.string().required(),
});

const register = async ({ name, email, password, role = 'user' }) => {
  const validations = schemaRegister.validate({
    nameOfUser: name,
    emailOfUser: email,
    passwordOfUser: password,
  });

  const emailAlreadyExist = await usersModel.findByEmail(email);

  if (emailAlreadyExist) {
    throw new Error(JSON.stringify(CONFLICT_REQUEST));
  }

  if (validations.error) {
    throw new Error(JSON.stringify(BAD_REQUEST));
  }

  return usersModel.register({ name, email, password, role });
};

const login = async ({ email, password }) => {
  const validations = schemaLogin.validate({
    emailOfUser: email,
    passwordOfUser: password,
  });

  if (validations.error) {
    throw new Error(JSON.stringify(UNAUTHORIZED));
  }

  const getAllUsers = await usersModel.getAll();
  // console.log(`========= ${getAllUsers} ================`);

  const checkUser = getAllUsers.find((user) => user.email === email && user.password === password);

  if (!checkUser) {
    throw new Error(JSON.stringify(USER_INCORRECT));
  }

  const { password: pass, id, role, ...user } = checkUser;

  const token = jwt.sign({ data: user }, KEY, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return { status: OK, token };
};

module.exports = {
  register,
  login,
};
