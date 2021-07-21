const recipesService = require('../services/recipesService');

const registerRecipe = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;
  const { status,
    registeredRecipe } = await recipesService.registerRecipe(newRecipe, authorization);
  res.status(status).json({ recipe: registeredRecipe });
};

module.exports = {
  registerRecipe,
};
