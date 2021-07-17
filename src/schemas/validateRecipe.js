const Joi = require('joi');

const {
  code: { BAD_REQUEST },
  message: { INVALID_ENTRYES },
} = require('../utils');

const schema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).messages({ 'any.required': INVALID_ENTRYES });

const validateRecipe = (req, res, next) => {
  const { error } = schema.validate(req.body);
  console.log('validateToken ======token', error);
  if (error) return res.status(BAD_REQUEST).json({ message: error.message });

  next();
};

module.exports = validateRecipe;
