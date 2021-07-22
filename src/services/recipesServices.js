const recipesModels = require('../models/recipesModels');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const id = userId;
  const { name: n, email, role, ...userIdSplead } = id;
  // console.log(userIdSplead);
  const idOb = Object.values(userIdSplead).join();

  const result = await recipesModels.createRecipes(
    name, ingredients, preparation, idOb,
  );

  return result;
};

const getAllRecipes = async () => {
  const result = await recipesModels.getAllRecipes();
  return result;
};

const getByRecipes = async (id) => {
  const result = await recipesModels.getByRecipes(id);
  return result;
};

const updateRecipes = async (id, upRecipe, userId) => {
  const idd = userId;

  const { name: n, email, role, ...userIdSplead } = idd;
  // console.log(userIdSplead);
  const idOb = Object.values(userIdSplead).join();

  const result = await recipesModels.updateRecipes(
    id, upRecipe, idOb,
  );
  return result;
};

const deleteById = async (id) => {
  const result = await recipesModels.deleteById(id);
  return result;
};

const updateWithImage = async (recipeToUpdate, path) => {
  const recipe = await recipesModels.updateWithImage(recipeToUpdate, path);
  return recipe; 
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByRecipes,
  updateRecipes,
  deleteById,
  updateWithImage,
};
