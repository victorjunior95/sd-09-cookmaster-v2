const Joi = require('joi');
const usersModel = require('../model/usersModel');
const { validateError } = require('./validateError');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// const isAdmin = async (userRole) => {
//   if (userRole !== 'admin') return validateError(403, 'Only admins can register new admins');
// };

const newUser = async (user, role) => {
  const { error } = UserSchema.validate(user);
  if (error) throw validateError(400, 'Invalid entries. Try again.');

  const foundEmail = await usersModel.findEmail(user.email);
  if (foundEmail) throw validateError(409, 'Email already registered');

  const registeredUser = await usersModel.registerUser(user, role);
  return registeredUser;
};

module.exports = { newUser };
