const Joi = require('joi');

const {
  code: { BAD_REQUEST },
  message: { INVALID_ENTRYES },
} = require('../utils');
// const MESSAGE_ERROR = 'Invalid entries. Try again.';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().message(INVALID_ENTRYES).required(),
  password: Joi.string().required(),
}).messages({
  'any.required': INVALID_ENTRYES,
  'string.empty': INVALID_ENTRYES,
});

const validateUser = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(BAD_REQUEST).json({ message: error.message });

  next();
};

module.exports = validateUser;
