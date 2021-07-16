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

const loginUser = async (user) => {
  const { email, password } = user;
  const findEmail = await UserModel.findByEmail(email);
  if (findEmail && password === findEmail.password) {
    return findEmail;
  }
  throw validateError(401, 'Incorrect username or password');
};

module.exports = {
  listAllUsers,
  registerUser,
  loginUser,
};