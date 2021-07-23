const recipeSchema = require('../schemas/recipeSchema');

const validateRecipe = async (req, res, next) => {
  const recipeData = req.body;
  const error = await recipeSchema.validateRecipeData(recipeData);
  if (error) {
    return res.status(error.response).json({ message: error.message });
  }
  next();
};

const validateRecipeId = async (req, res, next) => {
  const { id } = req.params;
  const error = await recipeSchema.validateId(id);
  if (error) {
    return res.status(error.response).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateRecipe,
  validateRecipeId,
};