const recipesService = require('../services/recipesService');

const createRecipe = async (req, res, next) => {
  try {
    const recipe = req.body;

    const createResult = await recipesService.createRecipe(recipe);

    return res.status(createResult.status).json({ recipe: createResult.result });
  } catch (err) {
    console.log('[Error user Controller] > ', err.message);
    return next(err);
  }
};

module.exports = { createRecipe };
