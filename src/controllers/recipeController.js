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

const getAllRecipes = async (req, res) => {
  const recipes = await recipeService.getAllRecipes();

  return res.status(httpStatus.OK).json(recipes);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};