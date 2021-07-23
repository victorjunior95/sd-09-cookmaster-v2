const recipeModel = require('../models/recipeModel');

const err = {
  message: 'Invalid entries. Try again.',
};

const checkFilds = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return err;
};

const createRecipe = async (name, ingredients, preparation, userId) => {

  const validFilds = checkFilds(name, ingredients, preparation)
  if (validFilds) return validFilds;

  const recipe = await recipeModel.create(name, ingredients, preparation, userId);
  return { recipe };
};

const 

module.exports = {
  createRecipe,
};