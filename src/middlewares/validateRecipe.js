const Joi = require('joi');

const validateError = (status, message) => ({
    status,
    message,
  });

const validateRecipe = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required()
    .error(new Error('Invalid entries. Try again.')),
    preparation: Joi.string().not().empty().required()
    .error(new Error('Invalid entries. Try again.')),
    ingredients: Joi.string().not().empty().required()
    .error(new Error('Invalid entries. Try again.')),
  }).validate(req.body);
  if (error) return next(validateError(400, error.message));
  next();
};

module.exports = validateRecipe;