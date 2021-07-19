const Joi = require('joi');
const model = require('../models/recipes');

const recipeSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string(),
  preparation: Joi.string().not().empty().required(),
  userId: Joi.string().not().empty().required(),
});
const create = async (recipe) => {
  const { error } = recipeSchema.validate(recipe);
  if (error) return { err: { code: 'invalid_data', message: 'Invalid entries. Try again' } };
    const { insertedId } = await model.create(recipe);
    return insertedId;
};

module.exports = { create };
