const recipesModel = require('../models/recipesModel');
const { validateRecipe } = require('../middlewares/validateRecipe');

const createRecipe = async (name, ingredients, preparation) => {
const recipeIsValid = await validateRecipe(name, ingredients, preparation);
const recipe = await recipesModel.createRecipe(name, ingredients, preparation);

if (recipeIsValid !== true) return recipeIsValid;

  return recipe.ops[0];
};

module.exports = {
  createRecipe,
};