const recipesModel = require('../models/recipesModel');

// const errorMiddleware = require('../middlewares/errorMiddleware');

const createRecipesService = async (name, ingredients, preparation, userId) => {
  const recipesCreate = await recipesModel.registerRecipes(name, ingredients, preparation, userId);
  console.log(recipesCreate);
  return recipesCreate;
};

module.exports = { createRecipesService };