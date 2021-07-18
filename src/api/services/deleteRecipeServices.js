const models = require('../models');
const { verifyToken } = require('../jwt');

module.exports = async (token, recipeId) => {
  await verifyToken(token);
  const result = await models.deleteRecipe(recipeId);

  if (!result) throw (Error('recipe not found'));

  return result;
};
