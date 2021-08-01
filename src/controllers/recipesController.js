const rescue = require('express-rescue');
const {
  newRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
  deleteRecipeByIdService,
} = require('../services/recipeServices');

const newRecipe = rescue(async (req, res, _next) => {
  const token = req.headers.authorization;
  const recipeData = req.body;
  const response = await newRecipeService(recipeData, token);
  if (response.error) return res.status(response.status).json({ message: response.error });
  
  return res.status(201).json(response);
});

const getAllRecipes = rescue(async (_req, res, _next) => {
  const allRecipes = await getAllRecipesService();
  return res.status(200).json(allRecipes);
});

const getRecipeById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const recipe = await getRecipeByIdService(id);

  if (recipe.error) return res.status(recipe.status).json({ message: recipe.error });
  return res.status(200).json(recipe);
});

const updateRecipeById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const updateData = req.body;
  const token = req.headers.authorization;
  const newData = { id, updateData, token };

  const response = await updateRecipeByIdService(newData);
  if (response.error) return res.status(response.status).json({ message: response.error });
  return res.status(200).json(response);
});

const deleteRecipeById = async (req, res, _next) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const validateId = await getRecipeByIdService(id);
  if (!validateId) return res.status(validateId.status).json({message: validateId.error});

  const deleted = await deleteRecipeByIdService(id, token);
  console.log(`deleted controller ok ${deleted}`);
  if (deleted.error) return res.status(deleted.status).json({ message: deleted.error });

  return res.status(204).json();
};

module.exports = {
  newRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};