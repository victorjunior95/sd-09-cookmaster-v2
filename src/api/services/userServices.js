const Joi = require('joi');
const userModel = require('../models/userModel');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const create = async (name, email, password) => {
  const userValidation = userSchema.validate({ name, email, password }); 
  const user = await userModel.getByEmail(email);
  const role = 'user';
  
  if (userValidation.error) {
    throw Object.assign(
      new Error('Invalid entries. Try again.'),
      { code: 'badRequest' },
   );
  }

  if (user) {
    throw Object.assign(
      new Error('Email already registered'),
      { code: 'conflict' },
   );
  }

  const newUser = await userModel.create(name, email, password, role);

  return newUser;
};

module.exports = { 
  create,
};
