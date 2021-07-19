const {
  createRecipeService,
  getAllRecipesService,
} = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const response = await createRecipeService(name, ingredients, preparation, token);

  if (response.isError) return res.status(response.status).json({ message: response.message });

  res.status(201).json({ recipe: response });
};

const getAllRecipes = async (_req, res) => {
  const response = await getAllRecipesService();
  console.log(response)
  return res.status(200).json(response);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};