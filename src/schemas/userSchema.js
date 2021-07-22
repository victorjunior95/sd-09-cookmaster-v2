const Joi = require('joi');
const userModel = require('../model/usersModel');

const responseCodes = {
  success: 200,
  created: 201,
  notFound: 404,
  notAuthorized: 401,
  badRequest: 400,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const errorsMessages = {
  nameTooShort: '"name" length must be at least 5 characters long',
  productExists: 'Product already exists',
  incorrectData: 'Incorrect username or password',
  quantityNotNumber: '"quantity" must be a number',
  fillAllFields: 'All fields must be filled',
  invalidEntries: 'Invalid entries. Try again.',
};

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
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

const validateLoginData = async (loginData) => {
  const { password } = loginData;
  const { error } = loginSchema.validate(loginData);
  if (error) {
    return { response: responseCodes.notAuthorized, message: errorsMessages.fillAllFields };
  }
  const validUSer = await userModel.findByEmail(loginData.email);
  if (!validUSer || (validUSer.password !== password)) {
    return { response: responseCodes.notAuthorized, message: errorsMessages.incorrectData };  
  }
};

module.exports = {
  validateUserData,
  validateLoginData,
};
