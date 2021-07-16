const recipesModel = require('../models/recipesModel');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.addRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  return { recipe };
};

const listRecipes = async () => {
  const recipes = await recipesModel.listRecipes();

  return recipes;
};

const getRecipe = async (id) => {
  const recipe = await recipesModel.getRecipe(id);

  if (!recipe) return null;

  return recipe;
};

module.exports = {
  addRecipe,
  listRecipes,
  getRecipe,
};
