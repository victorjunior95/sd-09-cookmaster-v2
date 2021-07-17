const RecipesModel = require('../models/RecipesModel');

const verifyRecipe = (name, ingredients, preparation) => {
  const errObj = {
    status: 400,
    message: 'Invalid entries. Try again.',
  };
  if (!name || !ingredients || !preparation) throw errObj;
};

const createRecipe = async (name, ingredients, preparation, id) => {
  verifyRecipe(name, ingredients, preparation);
  const newRecipe = await RecipesModel.createRecipe(name, ingredients, preparation, id);
  return newRecipe;
};

module.exports = {
createRecipe,
};