const Joi = require('joi');

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

const validateError = (status, message) => ({
  status,
  message,
});

const validateUser = (req, res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) return next(validateError(400, error.message));

  return next(); // quando dar certo urrul \o/
};

const errorMidd = (error, req, res, _next) => {
  console.log(error);
  if (error.status) {
    const { status, message } = error;
    return res.status(status).json({ message });
  }

  return res.status(500).json({
    code: 'internal',
    message: 'Internal server error',
  });
};

module.exports = {
  validateError,
  errorMidd,
  validateUser,
};