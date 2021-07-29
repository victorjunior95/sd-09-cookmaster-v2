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

module.exports = { user, userExists };