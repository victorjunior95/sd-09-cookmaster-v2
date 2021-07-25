const Joi = require('@hapi/joi');
const Recipes = require('../model/modelRecipes');
const { dataErr } = require('../helpers/index');

const schemaRecipeCreate = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createNewRecipesService = async (name, ingredients, preparation, userId) => {
  const { error } = schemaRecipeCreate.validate({ name, ingredients, preparation });
  if (error) {
    throw dataErr(400, 'Invalid entries. Try again.');
  }
  const recipe = await Recipes.recipeCreate(name, ingredients, preparation, userId);
  return { recipe };
};

const allRecipes = async () => {
  const recipes = await Recipes.allRecipesModel();
  return recipes;
};

const getOneRecipe = async (id) => {
  const recipe = await Recipes.oneRecipe(id);

  if (!recipe) {
    throw dataErr(404, 'recipe not found');
  }

  return recipe;
};

const recipeUpdate = async (id, name, ingredients, preparation) => {
  const recipe = await Recipes.recipeUpdate(id, name, ingredients, preparation);
  return recipe;
};

module.exports = {
  createNewRecipesService,
  allRecipes,
  getOneRecipe,
  recipeUpdate,
};
