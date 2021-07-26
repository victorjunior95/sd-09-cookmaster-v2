const rescue = require('express-rescue');

const Service = require('../services/RecipesService');
const { CREATE } = require('../middleware/httpStatus');

const createRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  
  const recipe = await Service.createRecipe({ name, ingredients, preparation, userId });
  if (recipe.error) {
    return next(recipe.error);
  }
  console.log(recipe);
  res.status(CREATE).json(recipe);
});

const findAll = rescue(async (_req, res) => {
  const recipes = await Service.findAll();
  res.json(recipes);
});

module.exports = {
  createRecipe,
  findAll,
};
