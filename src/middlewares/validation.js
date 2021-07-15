const Joi = require('joi');
const InvalidUserFormError = require('../errors/InvalidUserFormError');

const createUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
    .required(),
    email: Joi.string()
      .pattern(new RegExp('[^@]+@[^.]+.com$'))
      .required(),
    password: Joi.string()
    .required(),
  });

  const { name, email, password } = req.body;

  const { error } = schema.validate({ name, email, password });

  if (error) throw new InvalidUserFormError();

  next();
};

module.exports = {
  createUser,
};
