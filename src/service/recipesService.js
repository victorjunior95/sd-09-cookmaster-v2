const recipesModels = require('../models/recipesModels');

const postRecipes = async (name, ingredients, preparation, user) => {
  const { _id } = user;
  const userId = _id;

  const newRecipe = await recipesModels.postRecipes(name, ingredients, preparation, userId);

  return {
    recipe: newRecipe,
  };
};

const getRecipes = async () => recipesModels.getRecipes();

const getRecipesById = async (id) => recipesModels.getRecipesById(id);

module.exports = { postRecipes, getRecipes, getRecipesById };
