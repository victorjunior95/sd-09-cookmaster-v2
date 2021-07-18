const { getRecipeById } = require('../models/recipesModels');

const {
  code: { NOT_FOUND, UNAUTHORIZED },
  message: { RECIPE_NOT_FOUND, JWT_MALFORMED },
} = require('../utils');

const authToEdit = async (req, res, next) => {
  const { id: recipeId } = req.params;
  const { role } = req.user;
  let { _id: userId } = req.user;

  if (role === 'admin') next();

  const recipe = await getRecipeById(recipeId);

  const recipeUserId = JSON.stringify(recipe.userId);
  userId = JSON.stringify(userId);

  if (!recipe) return res.status(NOT_FOUND).json({ message: RECIPE_NOT_FOUND });

  if (recipeUserId !== userId) return res.status(UNAUTHORIZED).json({ message: JWT_MALFORMED });

  next();
};

module.exports = authToEdit;
