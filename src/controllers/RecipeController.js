const RecipeService = require('../services/RecipeService');
const { CREATED_STATUS } = require('../helpers/httpStatus');

const create = async (req, res) => {
  const recipeInfo = req.body;
  const { user } = req;
  const createdRecipe = await RecipeService.create(recipeInfo, user);
  console.log(createdRecipe);

  return createdRecipe.error
    ? res.status(createdRecipe.status).json(createdRecipe.error)
    : res.status(CREATED_STATUS).json(createdRecipe);
};

module.exports = {
  create,
};
