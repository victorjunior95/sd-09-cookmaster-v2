const recipesService = require('../service/recipesService');

const postRecipe = async (req, res, next) => {
  try {
    const newRecipe = req.body;
    const { _id } = req.user;
    const recipe = await recipesService.createRecipe(newRecipe, _id);
    return res.status(201).json({ recipe });
  } catch (err) {
    return next(err);
  }
};

const getRecipes = async (_req, res, next) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    if (recipes) res.status(200).json({ recipes });
  } catch (err) {
    return next(err);
  }
};

module.exports = { postRecipe, getRecipes };