const recipesServices = require('../services/recipesService');

const recipesRegistration = async (req, res, _next) => {
  const recipe = req.body;
  const { _id: userId } = req.user;
  const { status, result } = await recipesServices.register(recipe, userId);
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

module.exports = {
  recipesRegistration,
  getRecipesControllers,
  getByIdRecipeControllers,
};
