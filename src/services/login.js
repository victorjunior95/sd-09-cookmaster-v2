const Joi = require('joi');

const Login = require('../models/login');

const JoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateError = (statusCode, message) => ({
  statusCode,
  message,
});

const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

module.exports = async (user) => {
  const { error } = JoiSchema.validate(user);

  if (error) {
    throw validateError(401, 'All fields must be filled');
  }

  const passwordLength = 6;

  const validate = await Login.validateLogin(user);

  if (
    user.password.length <= passwordLength
    || !validate
    || !regex.test(user.email)
  ) {
    throw validateError(401, 'Incorrect username or password');
  }

  const { name, password, ...loginWithoutFields } = validate;

  return loginWithoutFields;
};
