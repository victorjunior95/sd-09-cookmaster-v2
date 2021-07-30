const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

const users = require('../models/users');

const err = (message, status) => ({ message, status });

const user = async ({ name, email, password }) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);

  if (!name || !email || !password || !validEmail) {
    throw err('Invalid entries. Try again.', 400);
  }
};

const userExists = async ({ email }) => {
  const exists = await users.getByEmail(email);
  if (exists) throw err('Email already registered', 409);
};

const login = async (email, password) => {
  if (!email || !password) {
    throw err('All fields must be filled', 401);
  }
  
  const userRegister = await users.getByEmail(email);
  if (!userRegister || userRegister.password !== password) {
    throw err('Incorrect username or password', 401);
  }
};

const token = async ({ authorization }) => {
  const secret = '12345678910111213';
  if (!authorization) {
    throw err('missing auth token');
  }
  
  const payload = jwt.verify(authorization, secret);

  // if (!payload) {
  //   throw err('jwt malformed', 401);
  // }

  const { password, ...userRegister } = await users.getByEmail(payload.email);
  if (!userRegister) {
    throw err('Invalid entries. Try again.');
  }
  return userRegister;
};

const recipe = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    throw err('Invalid entries. Try again.', 400);
  }
};

const recipeId = async (id) => {
  if (!ObjectID.isValid(id)) {
    throw err('recipe not found', 404);
  }
};

const admin = async ({ authorization }) => {
  const secret = '12345678910111213';
  const { role } = jwt.verify(authorization, secret);
  if (role !== 'admin') throw err('Only admins can register new admins');
};

module.exports = { user, userExists, login, token, recipe, recipeId, admin };