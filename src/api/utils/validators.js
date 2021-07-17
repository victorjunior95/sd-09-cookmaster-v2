const users = require('../models/users');

const user = async ({ name, email, password }) => {
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!name || !email || !password || !validEmail) {
    const err = { status: 400, message: 'Invalid entries. Try again.' };
    throw err;
  }
};

const userExists = async ({ email }) => {
  const exists = await users.getByEmail(email);
  if (exists) {
    const err = { status: 409, message: 'Email already registered' };
    throw err;
  }
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    const err = { status: 401, message: 'All fields must be filled' };
    throw err;
  }
  const userDB = await users.getByEmail(email);
  if (!userDB || userDB.password !== password) {
    const err = { status: 401, message: 'Incorrect username or password' };
    throw err;
  }
};

module.exports = { user, userExists, login };
