const RecipeModel = require('../../models/recipes');

const SUCCESS_CODE = 200;

module.exports = async (_req, res, _next) => {
  const response = await RecipeModel.getAllRecipes();

  res.status(SUCCESS_CODE).json(response);
};
