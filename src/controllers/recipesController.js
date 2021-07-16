const recipesService = require('../service/recipesService');

const HTTP_STATUS_CREATED = 201;

const createRecipe = async (req, res, _next) => {
  const recipe = req.body;
  const result = await recipesService.createRecipe(recipe);
  res.status(HTTP_STATUS_CREATED).json(result);
};

module.exports = {
  createRecipe,
};
