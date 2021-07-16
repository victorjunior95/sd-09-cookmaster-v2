const recipesService = require('../service/recipesService');

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;

const createRecipe = async (req, res, _next) => {
  const recipe = req.body;
  const result = await recipesService.createRecipe(recipe);
  res.status(HTTP_STATUS_CREATED).json(result);
};

const getAllRecipes = async (_req, res, _next) => {
  const result = await recipesService.getAllRecipes();
  res.status(HTTP_STATUS_OK).json(result);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
