const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const erros = require('../utils/codigosErro');

const secret = 'segredo';

const jwtConfig = {
  expiresIn: '14d',
  algorithm: 'HS256',
};

const userValidate = (data) => Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);

const validateLogin = (email, password) => {
  if (!email || !password) {
     return { status: erros.UNAUTHORIZED, json: { message: 'All fields must be filled' } };
}
};

const createUser = async (name, email, password) => {
  const { error } = userValidate({ name, email, password });
  if (error) return { status: erros.BAD_REQUEST, json: { message: 'Invalid entries. Try again.' } };
  const findEmail = await userModel.findByEmail(email);
  if (findEmail) {
  return { status: erros.CONFLICT, json: { message: 'Email already registered' } };
  }
  const result = await userModel.createUser(name, email, password);

  return {
     status: erros.CREATED,
     json: 
     { 
       user:
     { name: result.name, email: result.email, role: result.role } } };
};

const login = async (email, password) => {
  const error = validateLogin(email, password);
  if (error) {
    return { status: erros.UNAUTHORIZED, json: { message: 'All fields must be filled' } };
  }
  const findEmail = await userModel.findByEmail(email);
  if (!findEmail || findEmail.password !== password) { 
    return { 
    status: erros.UNAUTHORIZED,
    json: {
       message: 'Incorrect username or password',
      },
    };
  }
  const createToken = (objeto) => jwt.sign(objeto, secret, jwtConfig);
  const token = createToken(findEmail);
  return { status: erros.OK, json: { token } };
};

module.exports = {
  createUser,
  login,
};