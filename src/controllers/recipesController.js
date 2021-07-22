const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const DEFAULT_SUCCESS_STATUS = 200;
const CREATE_SUCCESS_STATUS = 201;

const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const recipe = { name, ingredients, preparation };
    const newRecipe = await recipesService.createRecipe(recipe, user);
    return res.status(CREATE_SUCCESS_STATUS).json({ recipe: newRecipe });
  } catch (err) { return next(err); }
};

const getRecipes = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const recipes = await recipesModel.getAllRecipes();
    res.status(DEFAULT_SUCCESS_STATUS).json(recipes);
  }
  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) {
    const err = new Error('recipe not found');
    err.status = 404;
    next(err);
  }
  return res.status(DEFAULT_SUCCESS_STATUS).json(recipe);
};

module.exports = {
  createRecipe,
  getRecipes,
};
