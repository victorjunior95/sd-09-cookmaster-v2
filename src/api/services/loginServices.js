const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const secret = 'sup3rs3gr3d0';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const login = async (email, password) => {
  const loginValidation = loginSchema.validate({ email, password }); 
  const user = await userModel.getByEmail(email);

  if (loginValidation.error) {
    throw Object.assign(
      new Error('All fields must be filled'),
      { code: 'unauthorized' },
   );
  }

  if (!user || password !== user.password) {
    throw Object.assign(
      new Error('Incorrect username or password'),
      { code: 'unauthorized' },
   );
  }

  const { password: _, ...userData } = user;

  const token = jwt.sign({ userData }, secret, jwtConfig);

  return token;
};

module.exports = { 
  login,
};
