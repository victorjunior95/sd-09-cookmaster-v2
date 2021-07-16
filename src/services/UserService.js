const UserModel = require('../models/UsersModel');
const { validateError } = require('../middlewares/validateUser');

const listAllUsers = async () => {
  const users = await UserModel.listAllUsers();
  
  return users;
};

const registerUser = async (user) => {
  const findEmail = await UserModel.findByEmail(user.email);
  if (findEmail) throw validateError(409, 'Email already registered');
  const newUser = await UserModel.registerUser(user);
  return newUser;
};

module.exports = {
  listAllUsers,
  registerUser,
};