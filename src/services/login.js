const Joi = require('joi');

const LoginShema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
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