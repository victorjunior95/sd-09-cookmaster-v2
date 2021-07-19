const Joi = require('joi');
const { validateError } = require('./errorMiddleware');

const UserSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Invalid entries. Try again.',
  }),
  ingredients: Joi.string().required().messages({
    'any.required': 'Invalid entries. Try again.',
  }),
  preparation: Joi.string().required().messages({
    'any.required': 'Invalid entries. Try again.',
  }),
});

const validateRecipes = (req, _res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) return next(validateError(400, error.message));

  return next();
};

module.exports = validateRecipes;