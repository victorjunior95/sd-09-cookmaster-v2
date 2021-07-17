const joi = require('joi');
const { messageError } = require('../middwares/errors');
const userModels = require('../models/users');
const { INVALID_ENTRIES, EMAIL_REGISTRED } = require('../middwares/errorMessages');
const { BAD_REQUEST_STATUS, CONFLICT_STATUS } = require('../middwares/httpStatus');

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const create = async (user) => {
  const { name, email, password } = user;
  const validateUser = userSchema.validate(user);
  if (validateUser.error) {
    throw messageError(BAD_REQUEST_STATUS, INVALID_ENTRIES);
  }

  const findEmail = await userModels.getByEmail(email);

  if (findEmail) {
    throw messageError(CONFLICT_STATUS, EMAIL_REGISTRED);
  }

  const completeUser = {
    name,
    email,
    password,
    role: 'user',
  };

  const newUser = await userModels.create(completeUser);

  return newUser;
};

module.exports = {
  create,
};