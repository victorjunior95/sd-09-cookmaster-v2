const Joi = require('joi');
const jwt = require('jsonwebtoken');

const secret = 'meuSegredoSuperSegreto';

const validateError = (status, message) => ({
  status,
  message,
});

const validateUser = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(3).required().error(new Error('Invalid entries. Try again.')),
    email: Joi.string().email().required().error(new Error('Invalid entries. Try again.')),
    password: Joi.string().min(3).required().error(new Error('Invalid entries. Try again.')),
  }).validate(req.body);
  if (error) return next(validateError(400, error.message));
  next();
};

const validateLogin = (req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required().error(new Error('All fields must be filled')),
    password: Joi.string().min(3).required().error(new Error('All fields must be filled')),
  }).validate(req.body);
  if (error) return next(validateError(401, error.message));
  next();
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    return {
      message: 'jwt malformed',
    };
  }
};

module.exports = {
  validateError,
  validateUser,
  validateLogin,
  verifyToken,
};