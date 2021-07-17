const Joi = require('joi');
const StatusCode = require('./StatusCode');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().message('Invalid entries. Try again.').required(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'Invalid entries. Try again.',
  'string.empty': 'Invalid entries. Try again.',
});

const validateUser = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(StatusCode.BAD_REQUEST).json({ message: error.message });

  next();
};

module.exports = {
  validateUser,
};
