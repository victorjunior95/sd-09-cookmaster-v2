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

module.exports = { user, userExists };