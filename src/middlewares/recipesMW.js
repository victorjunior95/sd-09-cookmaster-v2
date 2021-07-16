const RecipesServices = require('../services/recipesServices');
const response = require('./responseCodes');

const validateRecipe = (req, res, next) => {
  try {
    const recipeInfo = req.body;
    RecipesServices.validateRecipe(recipeInfo);
    return next();    
  } catch (error) {
    return next(error);
  }
};

const postRecipe = async (req, res, next) => {
  const recipeInfo = req.body;
  const { user } = req;
  const newRecipe = await RecipesServices.postRecipe(recipeInfo, user);
  if (newRecipe.error) return next(newRecipe);
  return res.status(response.STATUS_CREATED).json({ recipe: newRecipe });
};

const getAllRecipes = async (req, res) => {
  try {
    const registeredRecipes = await RecipesServices.getAllRecipes();
    return res.status(response.STATUS_OK).json(registeredRecipes);
  } catch (error) {
    return error;
  }
};

const getRecipeById = async (req, res, next) => {
  const recipeId = req.params.id;
  try {
    const foundRecipe = await RecipesServices.getRecipeById(recipeId);
    return res.status(response.STATUS_OK).json(foundRecipe);
  } catch (error) {
    return next(error);
  }
};

const authUser = async (req, res, next) => {
  const recipeId = req.params.id;
  const { _id, role } = req.user;
  try {
    const foundRecipe = await RecipesServices.getRecipeById(recipeId);
    if (foundRecipe.userId !== _id || !role === 'admin') return next(foundRecipe);
    return next();
  } catch (error) {
    return error;
  }
};

const updateRecipe = async (req, res, _next) => {
  const recipeInfo = req.body;
  const recipeId = req.params.id;
  const { user } = req;

  const updatedRecipe = await RecipesServices.updateRecipe(recipeId, recipeInfo, user);
  return res.status(response.STATUS_OK).json(updatedRecipe);
};

module.exports = {
  postRecipe,
  validateRecipe,
  getAllRecipes,
  getRecipeById,
  authUser,
  updateRecipe,
};
