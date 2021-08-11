const UserModel = require('../models/Users');
const UserSchemas = require('../schemas/Users');

const createUser = async (name, email, password) => {
  const isValid = UserSchemas.ValidateUser(name, email, password);
  const getEmail = await UserModel.getUserByEmail(email);
  const emailExists = await UserSchemas.emailAlreadyExists(getEmail);
  
  if (isValid.result) return isValid;
  if (emailExists.result) return emailExists;

  const created = await UserModel.createUser(name, email, password);

  return created;
};

const createUserAdmin = async (name, email, password, role) => {
  const isAdmin = UserSchemas.validateAdmin(role);
  if (isAdmin.result) return isAdmin;

  const isValid = UserSchemas.ValidateUser(name, email, password);
  const getEmail = await UserModel.getUserByEmail(email);
  const emailExists = await UserSchemas.emailAlreadyExists(getEmail);
  
  if (isValid.result) return isValid;
  if (emailExists.result) return emailExists;

  const created = await UserModel.createUser(name, email, password);

  return created;
};

module.exports = { createUser, createUserAdmin };