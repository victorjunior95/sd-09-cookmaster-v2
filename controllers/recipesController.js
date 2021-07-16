const rescue = require('express-rescue');
const recipesService = require('../services/recipesServices');

const addRecipe = rescue(async (req, res, next) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;

  const recipe = await recipesService.addRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  res.status(201).json(recipe);
});

module.exports = {
  addRecipe,
};
