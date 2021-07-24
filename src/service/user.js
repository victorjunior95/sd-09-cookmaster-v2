const joi = require('joi');
const userModel = require('../model/user');
const status = require('../other/httpCode');
const messages = require('../other/messages');

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const insertUserService = async (newUser, role = 'user') => {
  const { email } = newUser;
  const { error } = userSchema.validate(newUser); /* Faz a validação dos dados do usuário via Joi */
  if (error) throw messages.BAD_REQUEST_INVALID_ENTRIES; /* Lança erro se dados incorretos */

  const emailFound = await userModel.findUserByEmailModel(email); /* Busca email banco */
  if (emailFound) throw messages.CONFLICT_EMAIL_ALREADY_REGISTERED; /* Se existir lança erro Joi */

  const user = newUser;
  user.role = role; /* Seta valor user no campo role */
  const createUser = await userModel.insertUserModel(user); /* Busca banco */
  delete createUser.password; /* Tira o campo password */

  return {
    status: status.CREATED,
    createUser,
  };
};

module.exports = {
  insertUserService,
};
