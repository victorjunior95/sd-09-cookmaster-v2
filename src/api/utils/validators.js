const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const users = require('../models/users');

const err = (message) => ({ message });

const user = async ({ name, email, password }) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!name || !email || !password || !validEmail) {
    throw err('Invalid entries. Try again.');
  }
};

const userExists = async ({ email }) => {
  const exists = await users.getByEmail(email);
  if (exists) throw err('Email already registered');
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw err('All fields must be filled');
  }
  const userDB = await users.getByEmail(email);
  if (!userDB || userDB.password !== password) {
    throw err('Incorrect username or password');
  }
};

const recipe = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    throw err('Invalid entries. Try again.');
  }
};

const token = async ({ authorization }) => {
  const secret = '60f25632bbd8eb246fbe3170';
  if (!authorization) {
    throw err('missing auth token');
  }
  const payload = jwt.verify(authorization, secret);
  if (!payload) {
    throw err('jwt malformed');
  }
  const { password, ...userDB } = await users.getByEmail(payload.email);
  if (!userDB) {
    throw err('Invalid entries. Try again.');
  }
  return userDB;
};

const recipeId = async (id) => {
  if (!ObjectID.isValid(id)) throw err('recipe not found');
};

const admin = async ({ authorization }) => {
  const secret = '60f25632bbd8eb246fbe3170';
  const { role } = jwt.verify(authorization, secret);
  if (role !== 'admin') throw err('Only admins can register new admins');
};

module.exports = { user, userExists, login, recipe, token, recipeId, admin };
