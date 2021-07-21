const recipesService = require('../services/recipesService');

const CREATED = 201;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await recipesService.createRecipe(name, ingredients, preparation);

  if (newRecipe.isError) return res.status(newRecipe.status).json({ message: newRecipe.message });
  return res.status(CREATED).json({ 
    recipe: newRecipe,
  });
};

module.exports = {
  createRecipe,
};