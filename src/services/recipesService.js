const { validateRecipes, validateJWT } = require('../middlewares/validateRecipe');
const { createRecipe } = require('../models/recipesModel');

const createRecipeService = async (name, ingredients, preparation, token) => {
  const recipeIsValid = await validateRecipes(name, ingredients, preparation);
  const jwtIsValid = await validateJWT(token);
  // console.log(jwtIsValid);
  if (recipeIsValid.isError) return recipeIsValid;
  if (jwtIsValid.isError) return jwtIsValid;

  const recipe = await createRecipe(name, ingredients, preparation, jwtIsValid);
  return recipe.ops[0];
};

module.exports = { createRecipeService };