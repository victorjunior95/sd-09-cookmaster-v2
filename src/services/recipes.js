const recipesModel = require('../models/recipes');

const createRecipes = async (name, ingredients, preparation, id) => {
  const recipe = await recipesModel.createRecipes(name, ingredients, preparation, id);

  return { recipe };
};

module.exports = {
  createRecipes,
};
