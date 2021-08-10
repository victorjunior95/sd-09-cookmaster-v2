const recipesServices = require('../services/recipesService');

const registerRecipeControllers = async (req, res, _next) => {
  const recipe = req.body;
  const { _id: userId } = req.user;
  const { status, result } = await recipesServices
    .registerRecipeServices(recipe, userId);
  return res.status(status).json(result);
};

const getRecipesControllers = async (_req, res, _next) => {
  const { status, result } = await recipesServices.getRecipesServices();
  return res.status(status).json(result);
};

const getByIdRecipeControllers = async (req, res, _next) => {
  const { id } = req.params;
  const { status, result } = await recipesServices.getByIdRecipeServices(id);
  return res.status(status).json(result);
};

const editRecipeControllers = async (req, res, _next) => {
  const { id } = req.params;
  const newRecipe = req.body;
  const { status, result } = await recipesServices
    .editRecipeServices(id, newRecipe);
  return res.status(status).json(result);
};

const delRecipeControllers = async (req, res, _next) => {
  const { id } = req.params;
  const { status, result } = await recipesServices.delRecipeServices(id);
  return res.status(status).json(result);
};

module.exports = {
  registerRecipeControllers,
  getRecipesControllers,
  getByIdRecipeControllers,
  editRecipeControllers,
  delRecipeControllers,
};
