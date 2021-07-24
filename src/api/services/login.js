const Joi = require('joi');

const {
  getByEmail,
} = require('../models/userModel');

const validateError = (status, message) => ({ status, message });

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const login = async ({ email, password }) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw validateError(401, 'All fields must be filled');

  const userByEmail = await getByEmail(email);
  if (!userByEmail.length) throw validateError(401, 'Incorrect username or password');

  const passwordValid = password === userByEmail[0].password;
  if (!passwordValid) throw validateError(401, 'Incorrect username or password');

  const { _id } = userByEmail[0];
  return {
    _id,
    role: userByEmail[0].role,
  };
};


module.exports = login;