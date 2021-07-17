const users = require('../models/usersModel');

const fields = (user) => {
  if (!user.name || !user.email || !user.password) {
    const err = { status: 400, message: 'Invalid entries. Try again.' };
    throw err;
  }
  return null;
};

const validEmailFormat = (email) => {
  const isValidEmailFormat = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!isValidEmailFormat) {
    const err = { status: 400, message: 'Invalid entries. Try again.' };
    throw err;
  }
  return null;
};

const existEmail = async (email) => {
  const result = await users.findByEmail(email);
  if (result) {
    const err = { status: 409, message: 'Email already registered' }; 
    throw err;
  }
  return null;
};

const user = async (userFields) => {
  fields(userFields);
  validEmailFormat(userFields.email);
  await existEmail(userFields.email);
};

module.exports = {
  user,
};
