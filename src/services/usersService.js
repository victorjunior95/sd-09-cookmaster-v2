const usersModel = require('../models/usersModel');

const nameValidator = (name) => {
  if (!name) {
    const error = { status: 400, message: 'Invalid entries. Try again.' };
    throw error;
  }
};

const emailValidator = async (email) => {
  const regex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!regex || !email) {
    const invalidFormat = { status: 400, message: 'Invalid entries. Try again.' };
    throw invalidFormat;
  }
  const emailExists = await usersModel.findEmail(email);
  if (emailExists !== null) {
    const conflict = { status: 409, message: 'Email already registered' };
    throw conflict;
  }
};

const create = async (userInfo) => {
  nameValidator(userInfo.name);
  await emailValidator(userInfo.email);
  const newUser = await usersModel.create(userInfo);
  return newUser;
};

module.exports = {
  create,
};
