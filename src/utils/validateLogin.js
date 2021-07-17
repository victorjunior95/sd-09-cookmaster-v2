const users = require('../models/usersModel');

const fields = (credentials) => {
  if (!credentials.email || !credentials.password) {
    const err = { status: 401, message: 'All fields must be filled' };
    throw err;
  }
  return null;
};

const isValidEmail = async (credentials) => {
  const result = await users.findByEmail(credentials.email);
  if (!result || result.password !== credentials.password) {
    const err = { status: 401, message: 'Incorrect username or password' }; 
    throw err;
  }
  return result;
};

const login = async (credentials) => {
  fields(credentials);
  const result = await isValidEmail(credentials);
  return result;
};

module.exports = {
  login,
};
