const jwt = require('jsonwebtoken');
const valid = require('../validation/users');
const modelUser = require('../models/users');

const secret = 'senha';
const headers = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const create = async (name, email, password, role) => {
  let { error } = valid.create.validate({ name, email, password });
  if (error) {
    error.message = 'Invalid entries. Try again.';
    error.statusCode = 400;
    throw error;
  }
  const userExists = await modelUser.find(email);
  if (userExists) {
    error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }
  const user = await modelUser.create(name, email, password, role);
  const { _id } = user;

  return {
    user: { name, email, role, _id },
  };
};

const find = async (email, password) => {
  const { error } = valid.login.validate({ email, password });
  if (error) {
    error.message = 'All fields must be filled';
    error.statusCode = 401;
    throw error;
  }
  const user = await modelUser.find(email, password);
  if (!user) {
    const newerror = new Error('Incorrect username or password');
    newerror.statusCode = 401;
    throw newerror;
  }
  const { name, password: senha, ...tokens } = user;
  const token = jwt.sign({ data: tokens }, secret, headers);
  console.log(token);
  return {
    token,
  };
};

module.exports = {
  create,
  find,
};