const Joi = require('joi');

const Admin = require('../models/admin');
const validateAuth = require('../middlewares/validateAuth');

const JoiSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().not().empty().required(),
  password: Joi.string().not().empty().required(),
});

const validateError = (statusCode, message) => ({
  statusCode,
  message,
});

const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

module.exports = async (user, authorization) => {
  const auth = await validateAuth(authorization);

  if (auth.role !== 'admin') {
    throw validateError(403, 'Only admins can register new admins');
  }

  const { error } = JoiSchema.validate(user);

  if (error || !regex.test(user.email)) {
    throw validateError(400, 'Invalid entries. Try again.');
  }

  const findEmail = await Admin.findByEmail(user.email);

  if (findEmail) {
    throw validateError(409, 'Email already registered');
  }

  const createAdmin = await Admin.create(user);
  const { password, ...userWithoutPassword } = createAdmin;

  return userWithoutPassword;
};
