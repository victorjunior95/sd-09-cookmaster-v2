const Joi = require('joi');

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

const createLogin = async (login) => {
  const { error } = LoginShema.validate(login);

  if (error) {
    throw validationError(401, error.message);
  }
  return true;
};

module.exports = {
  createLogin,
};