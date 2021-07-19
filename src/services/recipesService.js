const { validateRecipes, validateJWT } = require('../middlewares/validateRecipe');
const { createRecipe } = require('../models/recipesModel');

const createRecipeService = async (name, ingredients, preparation, token) => {
  const recipeIsValid = await validateRecipes(name, ingredients, preparation);
  const jwtIsValid = await validateJWT(token);

  if (!recipeIsValid) return recipeIsValid;
  if (!jwtIsValid) return jwtIsValid;

  const recipe = await createRecipe(name, ingredients, preparation, token);
  return recipe.ops[0];
};

module.exports = { createRecipeService };