const recipesService = require('../services/recipes');

const createRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await recipesService.createRecipes(name, ingredients, preparation, req.user.id);

  return res.status(201).json(newRecipe);
};

module.exports = {
  createRecipe,
};
