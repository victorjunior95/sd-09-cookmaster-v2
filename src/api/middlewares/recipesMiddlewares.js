const joi = require('joi');

const checkRecipeInput = (req, res, next) => {
  const inputIsValid = joi.object({
    name: joi.string().required(),
    ingredients: joi.string().required(),
    preparation: joi.string().required(),
  }).validate(req.body);

  if (inputIsValid.error) {
    return res.status(400).json({
        message: 'Invalid entries. Try again.',
    }); 
  }

  return next();
};

module.exports = { checkRecipeInput }