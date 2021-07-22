const Joi = require('joi');
const createjwt = require('../api/auth/createjwt');
const UserModel = require('../model/users');

const commonError = 'All fields must be filled';
const LoginShema = Joi.object({
  email:
    Joi.string().email().required().messages({
      'string.base': commonError,
      'string.min': commonError,
      'string.email': 'Incorrect username or password',
      'any.required': commonError,
    }),
  password:
    Joi.string().min(8).required().messages({
      'string.base': commonError,
      'string.min': 'Incorrect username or password',
      'any.required': commonError,
    }),
});

const validationError = (status, message) => ({ status, message });

const findUser = async (loginInfo) => {
  const { error } = LoginShema.validate(loginInfo);

  if (error) {
    throw validationError(401, error.message);
  }

  const userSearch = await UserModel.findUser(loginInfo.email);

  if (!userSearch || userSearch.password !== loginInfo.password) {
    throw validationError(401, 'Incorrect username or password');
  }

  const { password: _, ...otherInfo } = userSearch;

  const token = createjwt(otherInfo);

  return { token };
};

module.exports = {
  findUser,
};