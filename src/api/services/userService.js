const {
  createUser,
  getByEmail,
} = require('../models/userModel');

const error400 = {
  err: {
    error: 400,
    message: 'Invalid entries. Try again.',
  },
};

const error409 = {
  err: {
    error: 409,
    message: 'Email already registered',
  },
};

const checkEmail = (name, email, password) => {
  if (!name || !email || !password) {
    return true;
  }

  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return true;
  }
};

const testEmail = async (email) => {
  const ttEmail = await getByEmail({ email });

  return ttEmail;
};

const createUserService = async (name, email, password) => {
  if (await testEmail(email)) {
    return error409;
  }

  if (await checkEmail(name, email, password)) {
    return error400;
  }

  const role = 'user';
  const newUser = createUser(name, email, password, role);

  return newUser;
};

module.exports = {
  createUserService,
};