// const { ObjectId } = require('mongodb');
const Joi = require('joi');
const userModel = require('../models/userModel');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });
const emailExists = async (email) => {
  const response = await userModel.getByEmail(email);
  return response;
}; 

const create = async ({ name, email, password, role }) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) throw validateError(400, 'Invalid entries. Try again.');
  const emailError = await emailExists(email);
  if (emailError) throw validateError(409, 'Email already registered');

  const idObject = await userModel.create({ name, email, password, role });
  return idObject;
};

module.exports = {
  create,
};