const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const DEFAULT_SUCCESS_STATUS = 200;
const CREATE_SUCCESS_STATUS = 201;
const DELETE_SUCCESS_STATUS = 204;

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
    return res.status(DEFAULT_SUCCESS_STATUS).json(recipes);
  }
  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) {
    const err = new Error('recipe not found');
    err.status = 404;
    return next(err);
  }
  return res.status(DEFAULT_SUCCESS_STATUS).json(recipe);
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const recipe = req.body;
    const updatedRecipe = await recipesService.updateRecipe(id, user, recipe);
    return res.status(DEFAULT_SUCCESS_STATUS).json(updatedRecipe);
  } catch (err) { return next(err); }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const deletedRecipe = await recipesService.deleteRecipe(id, user);
    if (deletedRecipe) return res.status(DELETE_SUCCESS_STATUS).send();
  } catch (err) { return next(err); }
};

module.exports = {
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
};
