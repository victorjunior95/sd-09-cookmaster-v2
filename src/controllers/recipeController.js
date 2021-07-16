const middlewares = require('../middlewares');
const recipeService = require('../services/recipeService');
const httpStatus = require('./httpStatus');

const createRecipe = [
  middlewares.validateToken,
  middlewares.checkRecipeData,
  async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  const { _id } = user;

  const recipe = await recipeService.createRecipe(name, ingredients, preparation, _id);

  return res.status(httpStatus.CREATED).json(recipe);
}];

const getAllRecipes = async (_req, res) => {
  const recipes = await recipeService.getAllRecipes();

  return res.status(httpStatus.OK).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipeById(id);

  if (recipe.message) {
    return res.status(httpStatus.MOT_FOUND).json(recipe);
  }
  return res.status(httpStatus.OK).json(recipe);
};

const updateRecipe = [
  middlewares.validateToken,
  async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const { _id } = user;
    const recipeObject = { id, name, ingredients, preparation, _id };
    const updatedRecipe = await recipeService.updateRecipe(recipeObject);
    return res.status(httpStatus.OK).json(updatedRecipe);
  },
];

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};