const recipesModel = require('../model/recipes');

const getRecipeImage = async (id) => {
  const recipeData = await recipesModel.getRecipeById(id);
  console.log(recipeData);
};

module.exports = {
  getRecipeImage,
};