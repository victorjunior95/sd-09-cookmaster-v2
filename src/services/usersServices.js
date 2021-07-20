const usersModel = require('../models/usersModel');
const usersValidations = require('../validations/usersValidations');

async function addUser(name, email, password) {
  usersValidations.validateName(name);
  usersValidations.validateEmail(email);
  usersValidations.validatePassword(password);
  await usersValidations.emailExists(email);
  const response = await usersModel.addUser(name, email, password);
  delete response.user.password;
  return { status: 201, response };
}

module.exports = {
  addUser,
};
