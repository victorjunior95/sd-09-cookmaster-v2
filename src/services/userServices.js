const Joi = require('joi');
const { newUserModel, existingEmailModel } = require('../models/usersModels');

const dataValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().required(),
});

const formatUser = (userCreationData) => {
  const { name, email, role, _id } = userCreationData;
  return {
    name,
    email,
    role,
    _id,
  };
};

const verifyIfEmailExists = async (userEmail) => {
  const registeredEmail = await existingEmailModel(userEmail);
  if (registeredEmail) return registeredEmail;
  return null;
};

const validateErrors = async (newUserData) => {
  const { error } = dataValidation.validate(newUserData);
  const registeredEmail = await verifyIfEmailExists(newUserData.email);
  if (error) {
    return {
      error: true,
      status: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  if (registeredEmail) {
    return {
      error: true,
      status: 409,
      message: 'Email already registered',
    };
  }
  return null;
};

const newUserService = async (newUserData) => {
  const error = await validateErrors(newUserData);
  if (error) return error;
 
  const create = await newUserModel(newUserData);
  const formattedUser = formatUser(create);
  return { user: formattedUser };
};

module.exports = { newUserService };
