const {
  createRecipeService,
  getAllRecipesService,
  getByIdService,
} = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const response = await createRecipeService(name, ingredients, preparation, token);

  if (response.isError) return res.status(response.status).json({ message: response.message });

  res.status(201).json({ recipe: response });
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const response = await getByIdService(id);

  if (response.isError) return res.status(response.status).json({ message: response.message });

  return res.status(200).json(response);
};

const getAllRecipes = async (_req, res) => {
  const response = await getAllRecipesService();
  return res.status(200).json(response);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};