const {
  createRecipeService,
  getAllRecipesService,
  getByIdService,
  updateRecipeService,
  deleteRecipeService,
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

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const token = req.headers.authorization;
  const response = await updateRecipeService(id, recipe, token);
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  if (response.isError) return res.status(response.status).json({ message: response.message });

  res.status(200).json(response);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const response = await deleteRecipeService(id, token);
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  if (response.isError) return res.status(response.status).json({ message: response.message });

  res.status(204).json();
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};