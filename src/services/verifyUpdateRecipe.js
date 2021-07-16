const { updateRecipe } = require('../Models/recipes');
const attRecipe = require('../schemas/attRecipe');

module.exports = async (id, userId, body) => {
  const recipe = await attRecipe(id, userId, body);
  if (recipe.code === 'unauthorized') {
    return recipe;
  }

  const data = await updateRecipe(recipe);
  
  return data;
};
