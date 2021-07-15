const UserModel = require('../model/userModel');
const EmailAlreadyExistError = require('../errors/EmailAlreadyExistError');

const create = async (name, email, password) => {
  if (await UserModel.isEmailRegistered(email)) throw new EmailAlreadyExistError();
  
  const role = 'user';
  const created = await UserModel.create(name, email, password, role);

  return created;
};

module.exports = {
  create,
};