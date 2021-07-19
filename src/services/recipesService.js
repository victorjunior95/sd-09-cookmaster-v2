const recipesModel = require('../models/recipesModel');

// const errorMiddleware = require('../middlewares/errorMiddleware');

const createRecipesService = async (name, ingredients, preparation, userId) => {
  const recipesCreate = await recipesModel.registerRecipes(name, ingredients, preparation, userId);
  // console.log(recipesCreate);
  return recipesCreate;
};

const listRecipesService = async () => {
  const recipes = await recipesModel.listRecipes();
  const listRecipes = [...recipes];
  // console.log('service', listRecipes);
  return listRecipes;
};

module.exports = {
  createRecipesService,
  listRecipesService,
};