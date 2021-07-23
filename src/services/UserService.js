const Joi = require("joi");
const UserModel = require("../models/UserModel");

const validateUserData = (data) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }).validate(data);
  if (error) {
    throw {
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
};

const validateEmail = async (email) => {
  const isValid = /\S+@\S+\.\S+/.test(email);
  if (!isValid) {
    throw {
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  const user = await UserModel.getByEmail(email);
  if (user) {
    throw {
      code: 'invalid_email',
      message: 'Email already registered',
    };
  }
}

const create = async (data) => {
  validateUserData(data);
  await validateEmail(data.email);
  return await UserModel.create(data);
};

module.exports = {
  create,
}