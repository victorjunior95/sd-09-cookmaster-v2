const Joi = require('joi');
const userModel = require('../model/usersModel');

const responseCodes = {
  success: 200,
  created: 201,
  notFound: 404,
  badRequest: 400,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const errorsMessages = {
  nameTooShort: '"name" length must be at least 5 characters long',
  productExists: 'Product already exists',
  quantityTooLow: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  wrongIdFormat: 'Wrong id format',
  invalidEntries: 'Invalid entries. Try again',
};

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateEmail = async (email) => {
  const user = await userModel.findByEmail(email);
  if (user) {
    return { response: 409, message: 'Email already registered' };
  }
};

const validateUserData = async (userData) => {
  const { error } = userSchema.validate(userData);
  if (error) return { response: responseCodes.badRequest, message: errorsMessages.invalidEntries };
  const invalidEmail = await validateEmail(userData.email);
  if (invalidEmail) return invalidEmail;
};
module.exports = {
  validateUserData,
};
