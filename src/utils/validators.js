const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const userModel = require('../models/userModel');

const err = (message) => ({ message });

const user = async ({ name, email, password }) => {
  const mailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!name || !email || !password || !mailRegex) {
    throw err('Invalid entries. Try again.');
  }
};

const userExists = async ({ email }) => {
  const exists = await userModel.getUserByEmail(email);
  if (exists) throw err('Email already registered');
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw err('All fields must be filled');
  }
  const registeredUser = await userModel.getUserByEmail(email);
  if (!registeredUser || registeredUser.password !== password) {
    throw err('Incorrect username or password');
  }
};

const recipe = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    throw err('Invalid entries. Try again.');
  }
};

const token = async ({ authorization }) => {
  const secret = '6102acd9063f652fa2e20aa6';
  if (!authorization) {
    throw err('missing auth token');
  }
  const payload = jwt.verify(authorization, secret);
  if (!payload) {
    throw err('jwt malformed');
  }
  const { password, ...resgisteredUser } = await userModel.getUserByEmail(payload.email);
  if (!resgisteredUser) {
    throw err('Invalid entries. Try again.');
  }
  return resgisteredUser;
};
const recipeId = async (id) => {
  if (!ObjectID.isValid(id)) throw err('recipe not found');
};

module.exports = { user, userExists, login, token, recipe, recipeId };

// faz parte do services / regras de negocios do services
// escape do teste unitarios pra não ter mais testes unitários
