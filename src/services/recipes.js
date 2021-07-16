const RecipeModel = require('../models/recipes');

const checkValues = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;

  return true;
};

const registerRecipe = async ({ name, ingredients, preparation }, userId) => {
  const isValid = checkValues(name, ingredients, preparation);

  if (!isValid) return { code: 400, message: 'Invalid entries. Try again.' };

  const recipe = await RecipeModel.registerRecipe({ name, ingredients, preparation }, userId);

  return recipe;
};

const getAllRecipes = () => RecipeModel.getAllRecipes()
  .then((recipes) => recipes);

const getRecipeById = async (id) => {
  const recipe = await RecipeModel.getRecipeById(id);

  if (!recipe) return { code: 404, message: 'recipe not found' };

  return recipe;
};

const editRecipe = async (id, { name, ingredients, preparation }) => {
  const recipe = await RecipeModel.editRecipe(id, { name, ingredients, preparation });

  if (!recipe) return { code: 404, message: 'recipe not found' };

  return recipe;
};

const deleteRecipe = async (id) => {
  await RecipeModel.deleteRecipe(id);
};

const addImageToRecipe = async (id, imageURL) => {
  const recipe = await RecipeModel.addImageToRecipe(id, imageURL);

  if (!recipe) return { code: 404, message: 'recipe not found' };

  return recipe;
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImageToRecipe,
};
