const models = require('../models');

module.exports = async (recipeId) => {
  const result = await models.getRecipeById(recipeId);

  if (!result) throw (Error('recipe not found'));

  return result;
};
