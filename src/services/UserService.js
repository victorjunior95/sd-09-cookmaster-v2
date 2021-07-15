const Joi = require('joi');
const UserModel = require('../models/UsersModel');

const UserSchema = Joi.object({
  name: Joi.string().min(3).required().error(new Error('Invalid entries. Try again.')),
  email: Joi.string().email().required().error(new Error('Invalid entries. Try again.')),
  password: Joi.string().min(6).required().error(new Error('Invalid entries. Try again.')),
});

const validateError = (status, message) => ({
  status,
  message,
});

const listAllUsers = async () => {
  const users = await UserModel.listAllUsers();
  
  return users;
};

const registerUser = async (user) => {
  const { name, email, password } = user;
  const { error } = UserSchema.validate(user);
  if (error) throw validateError(400, error.message);
  
  const findEmail = await UserModel.findByEmail(email);
  
  if (email === findEmail) {
    throw validateError(409, 'Email already registered');
  }
  if (user.role) return UserModel.registerUser({ name, email, password, role: 'user' });
  const newUser = await UserModel.registerUser({ name, email, password });
  return newUser;
};

module.exports = {
  listAllUsers,
  registerUser,
};