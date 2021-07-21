const Joi = require('joi');
const usersModel = require('../models/usersModel');

const userSchema = Joi.object().keys({
  name: Joi.string().not().empty().required(),
  email: Joi.string().not().empty().required()
  .email(),
  password: Joi.string().not().empty().required(),
});

const CREATED_STATUS = 201;

const BAD_REQUEST_INVALID_ENTRIES = {
  status: 400,
  err: { message: 'Invalid entries. Try again.' },
};

const EMAIL_CONFLICT = {
  status: 409,
  err: { message: 'Email already registered' },
};

const registerUser = async (newUser) => {
  const { email } = newUser;
  const { error } = userSchema.validate(newUser);
  if (error) throw BAD_REQUEST_INVALID_ENTRIES;
  const emailAlreadyExists = await usersModel.getUserByEmail(email);
  if (emailAlreadyExists) throw EMAIL_CONFLICT;
  const user = newUser;
  user.role = 'user';
  const registeredUser = await usersModel.registerUser(user);
  delete registeredUser.password;
  console.log();
  return {
    status: CREATED_STATUS,
    registeredUser,
  };
};
// todas as funções que dependerem de acesso ao bd precisam ser assíncronas

module.exports = {
  registerUser,
};