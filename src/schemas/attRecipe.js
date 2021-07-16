const { findRecipeById } = require('../Models/recipes');

const attRecipe = async (id, userId, body) => {
  const { name, ingredients, preparation } = body;
  const recipe = await findRecipeById(id);
  
  if (name) {
    recipe.name = name;
  }

  if (ingredients) {
    recipe.ingredients = ingredients;
  }

  if (preparation) {
    recipe.preparation = preparation;
  }

  return recipe; 
};

module.exports = attRecipe;