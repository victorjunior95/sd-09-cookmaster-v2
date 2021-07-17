const joi = require('joi');
const jwt = require('jsonwebtoken');
const { messageError } = require('../middwares/errors');
const usersModels = require('../models/users');

const SECRET = require('../middwares/secret');

const { 
  INVALID_ENTRIES,
  EMAIL_REGISTRED,
  INCORRECT_USERNAME, 
  ALL_FIELDS } = require('../middwares/errorMessages');

const { 
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS,
  UNAUTHORIZED_STATUS } = require('../middwares/httpStatus');

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const create = async (user) => {
  const { name, email, password } = user;
  const validateUser = userSchema.validate(user);

  if (validateUser.error) {
    throw messageError(BAD_REQUEST_STATUS, INVALID_ENTRIES);
  }

  const findEmail = await usersModels.getByEmail(email);

  if (findEmail) {
    throw messageError(CONFLICT_STATUS, EMAIL_REGISTRED);
  }

  const completeUser = {
    name,
    email,
    password,
    role: 'user',
  };

  const newUser = await usersModels.create(completeUser);

  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await usersModels.getByEmail(email);

  return user;
};

const login = async (user) => {
  const { email, password } = user;

  const validateUser = loginSchema.validate(user);

  if (validateUser.error) {
    throw messageError(UNAUTHORIZED_STATUS, ALL_FIELDS);
  }

  const findUser = await getUserByEmail(email);

  if (!findUser || findUser.password !== password) {
    throw messageError(UNAUTHORIZED_STATUS, INCORRECT_USERNAME);
  }
  
  const { _id, role } = findUser;

  const jwtUser = {
    _id,
    email,
    role,
  };

  const token = jwt.sign(jwtUser, SECRET, jwtConfig);

  return ({ token });
};

module.exports = {
  create,
  login,
  getUserByEmail,
};