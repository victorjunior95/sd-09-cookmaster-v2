const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const findAll = async () => {
  const recipes = await recipesModel.getAll();

  return recipes;
};

const findById = async (id) => {
  const recipe = await recipesModel.getById(id);

  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const recipeValidation = recipeSchema.validate({ name, ingredients, preparation }); 
  
  if (recipeValidation.error) {
    throw Object.assign(
      new Error('Invalid entries. Try again.'),
      { code: 'badRequest' },
   );
  }

  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);

  return newRecipe;
};

module.exports = {
  findAll,
  findById,
  create,
};
