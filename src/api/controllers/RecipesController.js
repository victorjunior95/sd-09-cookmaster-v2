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
  // console.log(req.body, req.user);
  res.status(CREATE).json(recipe);
});

module.exports = {
  createRecipe,
};
