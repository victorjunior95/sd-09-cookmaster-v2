// usersService
const statusError = require('./allMessages');
const validators = require('./allValidators');
const UsersModel = require('../models/UsersModel');

async function usersGetAll() {
  try {
    const data = await UsersModel.findAllUsers();
    if (!data) throw statusError.type9;
    return data;
  } catch (error) {
    return error;
  }
}

function userPatternVerifier(name, email, password) {
  try {
    if (!validators.nameIsValid(name)) throw statusError.type1;
    if (!validators.emailIsValid(email)) throw statusError.type1;
    if (!validators.passwordIsValid(password)) throw statusError.type1;
    return {};
  } catch (error) {
    return error;
  }
}

async function userExistsVerifier(email) {
  try {
    const data = await UsersModel.findOneUser({ email });
    if (data) throw statusError.type8;
    return {};
  } catch (error) {
    return error;
  }
}

async function userAdd(objectUser) {
  try {
    const data = await UsersModel.addOneUser(objectUser);
    delete data.password;
    return { user: data };
  } catch (error) {
    return error;
  }
}

async function userAdminAdd(objectUser) {
  try {
    const { role } = objectUser;
    if (role !== 'admin') throw statusError.type6;
    const data = await UsersModel.addOneUser(objectUser);
    delete data.password;
    return { user: data };
  } catch (error) {
    return error;
  }
}

module.exports = { 
  usersGetAll,
  userPatternVerifier,
  userExistsVerifier,
  userAdd,
  userAdminAdd,
};
