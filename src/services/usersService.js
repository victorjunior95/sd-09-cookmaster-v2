const usersModel = require('../models/usersModel');
const { errorsUsers } = require('../helpers/errorMessagens');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const generateMessageError = (status, message) => ({ status, message });

const validateRequiredFields = (name, email, password) => {
  if (!name || !email || !password) {
    return generateMessageError(BAD_REQUEST, errorsUsers.invalidEntries);
  }
};

const validateEmail = async (email) => {
  const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  if (!regex.test(email)) return generateMessageError(BAD_REQUEST, errorsUsers.invalidEntries);

  const userFound = await usersModel.findByEmail(email);
  if (userFound.length) return generateMessageError(CONFLICT, errorsUsers.duplicateEmail);
};

const addUser = async (dataUser) => {
  const { name, password, email } = dataUser;
  const invalideEntries = validateRequiredFields(name, email, password);
  const errorEmail = await validateEmail(email);

  if (invalideEntries) throw (invalideEntries);
  if (errorEmail) throw (errorEmail);

  const response = await usersModel.addUser(dataUser);
  return response;
};

module.exports = {
  addUser,
};
