const { createRecipeService } = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const response = await createRecipeService(name, ingredients, preparation, token);

  if (response.isError) return res.status(response.status).json({ message: response.message });

  res.status(201).json({ recipe: response });
};

module.exports = {
  createRecipe,
};