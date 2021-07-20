const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const SECRET = 'TH!S!S@s3CR3t';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createErrorMsg = (status, msg) => ({
  status,
  msg,
});

const newUser = async (name, email, password) => {
  const { error } = UserSchema.validate({ name, email, password });
  if (error !== undefined) throw createErrorMsg(400, 'Invalid entries. Try again.');

  const currentUser = await UsersModel.findByEmail(email);

  if (currentUser.length > 0) {
    throw createErrorMsg(409, 'Email already registered');
  }

  const users = await UsersModel.create(name, email, password, 'user');
  delete users.password;
  return { status: 201, result: { user: { ...users } } };
};

const userLogin = async (email, password) => {
  const { error } = LoginSchema.validate({ email, password });
  if (error !== undefined) throw createErrorMsg(401, 'All fields must be filled');

  const currentUser = await UsersModel.findByEmail(email);

  if (currentUser.length === 0) {
    throw createErrorMsg(401, 'Incorrect username or password');
  }
  if (currentUser[0].password !== password) {
    throw createErrorMsg(401, 'Incorrect username or password');
  }

  const { password: _, name: __, ...userWithoutPasswordAndName } = currentUser[0];

  const token = jwt.sign(userWithoutPasswordAndName, SECRET, jwtConfig);

  return { status: 200, result: { token } };
};

module.exports = {
  newUser,
  userLogin,
};