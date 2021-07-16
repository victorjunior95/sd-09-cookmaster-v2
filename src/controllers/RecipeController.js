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

module.exports = {
  createRecipe,
  getRecipes,
};