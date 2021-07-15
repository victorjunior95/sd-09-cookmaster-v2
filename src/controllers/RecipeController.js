const RecipeService = require('../services/RecipeService');
const { CREATED_STATUS, OK_STATUS } = require('../helpers/httpStatus');

const create = async (req, res) => {
  const recipeInfo = req.body;
  const { user } = req;
  const createdRecipe = await RecipeService.create(recipeInfo, user);

  return createdRecipe.error
    ? res.status(createdRecipe.status).json(createdRecipe.error)
    : res.status(CREATED_STATUS).json(createdRecipe);
};

const getAll = async (_req, res) => {
  const recipesList = await RecipeService.getAll();
  console.log(recipesList);

  return res.status(OK_STATUS).json(recipesList);
};

module.exports = {
  create,
  getAll,
};
