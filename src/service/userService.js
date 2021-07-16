const UserModel = require('../model/userModel');
const Errors = require('../errors');

const create = async (name, email, password) => {
  if (await UserModel.isEmailRegistered(email)) throw new Errors.EmailAlreadyExistError();
  
  const role = 'user';
  const response = await UserModel.create(name, email, password, role);
  const created = { name: response.name, email: response.email, role: response.role };
  return created;
};

module.exports = {
  create,
};