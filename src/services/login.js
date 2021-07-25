const Joi = require('joi');

const Login = require('../models/login');
const { findByEmail } = require('../models/users');

const JoiSchema = Joi.object({
  email: Joi.string().not().empty().required(),
  password: Joi.string().not().empty().required(),
});

const validateError = (statusCode, message) => ({
  statusCode,
  message,
});

const validateEmail = async (userEmail) => {
  const email = await findByEmail(userEmail);
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!email || !regex.test(userEmail)) {
    throw validateError(401, 'Incorrect username or password');
  }
};

const validateUserPassword = (user, validate) => {
  if (!validate || user.password !== validate.password) {
    throw validateError(401, 'Incorrect username or password');
  }
};

module.exports = async (user) => {
  const { error } = JoiSchema.validate(user);

  if (error) {
    throw validateError(401, 'All fields must be filled');
  }

  await validateEmail(user.email);

  const validate = await Login(user);

  validateUserPassword(user, validate);

  const { name, password, ...loginWithoutFields } = validate;

  return loginWithoutFields;
};
