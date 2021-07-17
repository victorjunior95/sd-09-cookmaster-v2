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

module.exports = {
  createRecipes,
  getAllRecipes,
  getByRecipes,
};
