const models = require('../models');
const { verifyToken } = require('../jwt');

module.exports = async (token, recipeId, recipeData) => {
  const payload = await verifyToken(token);
  const { _id } = payload;

  const result = await models.updateRecipe(recipeId, recipeData);
  if (!result) throw (Error('recipe not found'));
  if (result.result.nModified === 0) throw (Error('recipe not modified'));

  return { ...recipeData, _id: recipeId, userId: _id };
};
