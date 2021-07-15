const UserModel = require('../model/userModel');
const EmailAlreadyExistError = require('../errors/EmailAlreadyExistError');

const create = async (name, email, password) => {
  if (await UserModel.isEmailRegistered(email)) throw new EmailAlreadyExistError();
  
  const role = 'user';
  const response = await UserModel.create(name, email, password, role);
  const created = { name: response.name, email: response.email, role: response.role };
  return created;
};

module.exports = {
  create,
};