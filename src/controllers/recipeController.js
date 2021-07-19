const { createRecipeService } = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const response = await createRecipeService(name, ingredients, preparation, userId);

  if (response.isError) return res.status(response.status).json({ message: response.message });

  res.status(201).json({ recipe: response });
};

module.exports = {
  createRecipe,
};