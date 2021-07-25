const recipeModel = require('../models/recipeModel');

const err = {
  message: 'Invalid entries. Try again.',
};

const checkFilds = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return err;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const validFilds = checkFilds(name, ingredients, preparation);
  if (validFilds) return validFilds;

  const recipe = await recipeModel.create(name, ingredients, preparation, userId);
  return { recipe };
};

const allRecipes = async () => {
  const list = await recipeModel.showAll();
  return list;
};

const findRecipe = async (id) => {
  const recipe = await recipeModel.findId(id);
  
  if (!recipe) return { message: 'recipe not found' };

  return recipe;
};

const updateRecipe = async (name, ingredients, preparation, id) => {
  const changeRecipe = await recipeModel.update(name, ingredients, preparation, id);

  if (!changeRecipe) return { message: 'falhow' };

  return changeRecipe;
};

const deleteRecipe = async (id) => {
  const selectRecipe = await recipeModel.drop(id);

  return selectRecipe;
};

const addRecipeImage = async (image, id) => {
  const changeRecipe = await recipeModel.addImage(image, id);

  if (!changeRecipe) return { message: 'falhow image' };

  return changeRecipe;
};

module.exports = {
  createRecipe,
  allRecipes,
  findRecipe,
  updateRecipe,
  deleteRecipe,
  addRecipeImage,
};