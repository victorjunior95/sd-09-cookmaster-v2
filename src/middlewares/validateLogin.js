const Joi = require('joi');
const { validateError } = require('./errorMiddleware');

const UserSchema = Joi.object({ // mudar a frase schema
  email: Joi.string().email().required().messages({
    'any.required': 'All fields must be filled',
    'string.email': 'Incorrect username or password',
  }),
  password: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
    'string.password': 'Incorrect username or password',
  }),
});

const validateLogin = (req, _res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) return next(validateError(401, error.message));

  return next(); // quando dar certo urrul \o/
};

module.exports = validateLogin;