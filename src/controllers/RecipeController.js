const jwtDecode = require('jwt-decode');
const RecipeService = require('../services/RecipeService');

function getUserIdFromToken(token) {
  const { _id } = jwtDecode(token);
  return _id;
}

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  // const { user } = req;

  const userId = getUserIdFromToken(authorization);

  const { _id } = await RecipeService.createRecipe(name, ingredients, preparation, userId);

  return res.status(201).json({ recipe: { name, ingredients, preparation, userId, _id } });
};

const getRecipes = async (_req, res) => {
  const recipes = await RecipeService.getRecipes();
  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeService.getRecipeById(id);

  if (recipe === null) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { params: { id }, body, user } = req;
  const { _id } = user;
  const userId = _id;

  const recipe = await RecipeService.updateRecipe(id, body, userId);

  if (recipe === null) return res.status(404).json({ message: 'recipe not found' });
  
  return res.status(200).json({ _id: id, ...body, userId });
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};