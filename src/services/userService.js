const Joi = require('joi');
const userModel = require('../models/userModel');

const validateUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

const create = async ({ name, email, password, role }) => {
    const { error } = validateUser.validate({ name, email, password });

  if (error) {
    return {
      code: 'Invalid_data.',
      error: { message: 'Invalid entries. Try again.' },
      status: 400,
    };
  }
  const userByEmail = await userModel.getUserByEmail(email);
  console.log(userByEmail);
  if (userByEmail.length > 0) {
    return {
      code: 'invalid_data',
      error: { message: 'Email already registered' },
      status: 409,
    };
  }

  return userModel.create({ name, email, password, role });
};

module.exports = {
    create,
  }; 