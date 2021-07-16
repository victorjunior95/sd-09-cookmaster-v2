const Joi = require('joi');
const models = require('../models');

const validateUser = (user) => 
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(user);

const validateEmail = async (email) => {
    const patternEmail = /\S+@\S+\.\S+/;
    return patternEmail.test(email);
};

module.exports = async (userData) => {
  const { error } = validateUser(userData);
  const { email } = userData;
  
  if (error || !await validateEmail(email)) throw (Error('Invalid entries. Try again.'));
  if (await models.getUserByEmail(email)) throw (Error('Email already registered'));

  const result = await models.createUser({ ...userData, role: 'user' });

  delete result.password;
  return { user: result };
};
