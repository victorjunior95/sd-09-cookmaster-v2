const { validateRecipes, validateJWT } = require('../middlewares/validateRecipe');
const {
  createRecipe,
  getAllRecipes,
  getById,
} = require('../models/recipesModel');

const createRecipeService = async (name, ingredients, preparation, token) => {
  const recipeIsValid = await validateRecipes(name, ingredients, preparation);
  const jwtIsValid = await validateJWT(token);

  if (recipeIsValid.isError) return recipeIsValid;
  if (jwtIsValid.isError) return jwtIsValid;

  const recipe = await createRecipe(name, ingredients, preparation, jwtIsValid);
  return recipe.ops[0];
};

const getAllRecipesService = async () => {
  const recipes = await getAllRecipes();
  return recipes;
};

const getByIdService = async (id) => {
  const recipe = await getById(id);
  if (!recipe) {
    return { isError: true,
      message: 'recipe not found',
      status: 404,
    };
  }

  return recipe;
};

module.exports = {
  createRecipeService,
  getAllRecipesService,
  getByIdService,
};