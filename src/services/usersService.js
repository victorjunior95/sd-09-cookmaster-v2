const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const SECRET = 'cookmaster';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const HTTP_BADREQ_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_CONFLIT_STATUS = 409;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;

const schemaValidateUser = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required(),
});

const schemaValidateLogin = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required(),
});

const create = async ({ name, email, password }) => {
  const validateCreate = schemaValidateUser.validate({ name, email, password });
  if (validateCreate.error) {
    return {
      status: HTTP_BADREQ_STATUS, err: 'Invalid entries. Try again.',
  };
}
  const existsUser = await usersModel.findEmail(email);
  if (existsUser) {
    return {
      status: HTTP_CONFLIT_STATUS, err: 'Email already registered',
    };
  }
  const user = await usersModel.create(name, email, password);
  const { password: _, ...userWithoutPassword } = user;
  return {
    status: HTTP_CREATED_STATUS, user: userWithoutPassword,
  };
};

const findUserCreateToken = async (email, password) => {
  const validateFind = schemaValidateLogin.validate({ email, password });
  if (validateFind.error) {
    return {
      status: HTTP_UNAUTHORIZED_STATUS,
      err: 'All fields must be filled',
    };
  }
  const user = await usersModel.findUser(email, password);
  if (!user) {
    return {
      status: HTTP_UNAUTHORIZED_STATUS,
      err: 'Incorrect username or password',
    };
  }
  const { password: _, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);
  return { status: HTTP_OK_STATUS, token };
};
module.exports = { 
  create,
  findUserCreateToken,
};