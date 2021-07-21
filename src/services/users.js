const Joi = require('@hapi/joi');
const UserModel = require('../model/users');

const commonError = 'Invalid entries. Try again.';
const UserShema = Joi.object({
  name:
    Joi.string().required().messages({
      'string.base': commonError,
      'any.required': commonError,
    }),
  email:
    Joi.string().email().required().messages({
      'string.base': commonError,
      'string.min': commonError,
      'string.email': commonError,
      'any.required': commonError,
    }),
  password:
    Joi.string().min(8).required().messages({
      'string.base': commonError,
      'string.min': commonError,
      'any.required': commonError,
    }),
});

const validationError = (status, message) => ({ status, message });

const uniqueEmail = async (email) => {
  const result = await UserModel.listAllUsers();

  return result.some((user) => user.email === email);
};

const createUser = async (user) => {
  const { error } = UserShema.validate(user);
  if (error) throw validationError(400, error.message);

  if (await uniqueEmail(user.email)) throw validationError(409, 'Email already registered');

  const result = await UserModel.registerUser(user);
  return result;
};

module.exports = {
  createUser,
};
