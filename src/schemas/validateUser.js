const Joi = require('joi');

const MESSAGE_ERROR = 'Invalid entries. Try again.';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().message(MESSAGE_ERROR).required(),
  password: Joi.string().required(),
}).messages({
  'any.required': MESSAGE_ERROR,
  'string.empty': MESSAGE_ERROR,
});

const validateUser = (req, res, next) => {
  const BAD_REQUEST = 400;
  const { error } = schema.validate(req.body);
  if (error) return res.status(BAD_REQUEST).json({ message: error.message });

  next();
};

module.exports = validateUser;
