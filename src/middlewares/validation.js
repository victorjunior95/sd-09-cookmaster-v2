const Joi = require('joi');
const InvalidUserFormError = require('../errors/InvalidUserFormError');

const createUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
    .required(),
    email: Joi.string()
      .pattern('[^@]+@[^.]+.com$')
      .required(),
    password: Joi.string()
    .required(),
    role: Joi.string(),
  });

  const { name, email, password, role } = req.body;

  const { error } = schema.validate({ name, email, password, role });

  if (error) throw new InvalidUserFormError();

  next();
};

module.exports = {
  createUser,
};
