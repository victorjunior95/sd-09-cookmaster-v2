const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const users = require('../models/users');

const user = async ({ name, email, password }) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!name || !email || !password || !validEmail) {
    const err = { message: 'Invalid entries. Try again.' };
    throw err;
  }
};

const userExists = async ({ email }) => {
  const exists = await users.getByEmail(email);
  if (exists) {
    const err = { message: 'Email already registered' };
    throw err;
  }
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    const err = { message: 'All fields must be filled' };
    throw err;
  }
  const userDB = await users.getByEmail(email);
  if (!userDB || userDB.password !== password) {
    const err = { message: 'Incorrect username or password' };
    throw err;
  }
};

const recipe = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    const err = { message: 'Invalid entries. Try again.' };
    throw err;
  }
};

const token = async ({ authorization }) => {
  const secret = '60f25632bbd8eb246fbe3170';
  if (!authorization) {
    const err = { message: 'jwt malformed' };
    throw err;
  }
  const payload = jwt.verify(authorization, secret);
  const { password, ...userDB } = await users.getByEmail(payload.email);
  if (!userDB) {
    const err = { message: 'Invalid entries. Try again.' };
    throw err;
  }
  return userDB;
};

const recipeId = async (id) => {
  if (!ObjectID.isValid(id)) {
    const err = { message: 'recipe not found' };
    throw err;
  }
};

module.exports = { user, userExists, login, recipe, token, recipeId };
