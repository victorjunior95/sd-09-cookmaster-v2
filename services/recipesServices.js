const recipesModel = require('../models/recipesModel');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.addRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  return { recipe };
};

module.exports = {
  addRecipe,
};
