const recipesService = require('../services/recipesService');

const createRecipe = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const recipe = { ...req.body, userId };

    const createResult = await recipesService.createRecipe(recipe);

    return res.status(createResult.status).json({ recipe: createResult.result });
  } catch (err) {
    console.log('[Error recipesController] > ', err.message);
    return next(err);
  }
};

const findAll = async (_req, res, next) => {
  try {
    const searchResult = await recipesService.findAll();

    return res.status(searchResult.status).json(searchResult.result);
  } catch (err) {
    console.log('[Error recipesController] > ', err.message);
    return next(err);
  }
};

module.exports = { createRecipe, findAll };
