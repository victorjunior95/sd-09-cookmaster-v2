const Joi = require('joi');

const validateRecipeInput = (req, res, next) => {
  const JoiValidation = Joi.string().not().empty().required();

  const { error } = Joi.object({
    name: JoiValidation,
    ingredients: JoiValidation,
    preparation: JoiValidation,
  }).validate(req.body);
  
  if (error) {
    error.details[0].code = 400;
    error.details[0].message = 'Invalid entries. Try again.';
    return next(error);
  }

  next();
};

module.exports = validateRecipeInput;