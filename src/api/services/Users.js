// const { ObjectId } = require('mongodb');
const Users = require('../models/Users');

const invalidEntries = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const uniqueEmail = {
  status: 409,
  message: 'Email already registered',
};

// regex referência: https://ui.dev/validate-email-address-javascript/
const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUserInfo = async (name, email, password) => {
  if (validFormat.test(email) === false || !name || !password) return invalidEntries;

  if (await Users.findByEmail(email)) return uniqueEmail;
};

const registerUser = async (name, email, password) => {
  const data = await validateUserInfo(name, email, password);

  if (data) return data;

  return Users.createUser(name, email, password);
};

module.exports = {
  registerUser,
};
