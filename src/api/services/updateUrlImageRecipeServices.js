const fs = require('fs').promises;
const models = require('../models');
const { verifyToken } = require('../jwt');

module.exports = async (token, recipeId, urlImage) => {
  const payload = await verifyToken(token);
  const { _id } = payload;
  const result = await models.updateUrlImageRecipe(recipeId, urlImage);

  if (!result) {
    await fs.rm(urlImage);
    throw (Error('recipe not found'));
  }

  return { ...result, userId: _id, image: urlImage };
};
