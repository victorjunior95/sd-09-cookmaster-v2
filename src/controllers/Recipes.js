const rescue = require('express-rescue');
const RecipesService = require('../services/Recipes');

const createRecipe = rescue(async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const { result, code } = await RecipesService.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  res.status(code).json(result);
});

module.exports = { createRecipe };