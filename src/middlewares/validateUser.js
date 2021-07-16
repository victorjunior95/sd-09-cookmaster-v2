const Joi = require('joi');
const { validateError } = require('./errorMiddleware');

const UserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Invalid entries. Try again.',
    'string.email': 'Invalid entries. Try again.',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Invalid entries. Try again.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Invalid entries. Try again.',
  }),
});

const validateUser = (req, _res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) return next(validateError(400, error.message));

  return next(); // quando dar certo urrul \o/
};

module.exports = validateUser;
