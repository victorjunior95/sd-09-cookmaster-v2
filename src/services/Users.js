const Joi = require('joi');

const usersModel = require('../models/Users');

const CONFLICT_REQUEST = {
  message: 'Email already registered',
  status: 409,
};

const BAD_REQUEST = {
  message: 'Invalid entries. Try again.',
  status: 400,
};

const schema = Joi.object({
  nameOfUser: Joi.string().required(),
  emailOfUser: Joi.string().email({
    minDomainSegments: 2, tlds: { allow: ['com', 'net'] },
  }).required(),
  passwordOfUser: Joi.string().required(),
});

const register = async ({ name, email, password, role = 'user' }) => {
  const validations = schema.validate({
    nameOfUser: name,
    emailOfUser: email,
    passwordOfUser: password,
  });

  const emailAlreadyExist = await usersModel.findByEmail(email);

  if (emailAlreadyExist) {
    throw new Error(JSON.stringify(CONFLICT_REQUEST));
  }

  if (validations.error) {
    throw new Error(JSON.stringify(BAD_REQUEST));
  }

  return usersModel.register({ name, email, password, role });
};

module.exports = {
  register,
};
