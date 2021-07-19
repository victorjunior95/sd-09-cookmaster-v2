// const { ObjectId } = require('mongodb');
const RecipesServices = require('../services/recipesServices');
const RecipesModel = require('../models/recipesModel');
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

const allowEditing = async (req, res, next) => {
    const { _id: loggedId, role } = req.user;
    const { userId } = await RecipesServices.getRecipeById(req.params.id);
    const idtest = loggedId.toString();
    const idtest2 = userId.toString();
    if (role === 'admin') return next();
    if (idtest !== idtest2) {
      console.log(idtest, idtest2);
      return res.status(response.UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
    return next();
};

const updateRecipe = async (req, res, _next) => {
  try {
    const recipeInfo = req.body;
    const recipeId = req.params.id;
  
    const updatedRecipe = await RecipesServices.updateRecipe(recipeId, recipeInfo);
    return res.status(response.STATUS_OK).json(updatedRecipe);
  } catch (error) {
    return error;
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await RecipesModel.deleteRecipe(recipeId);
    if (!deletedRecipe) return res.status(response.BAD_REQUEST);
    return res.status(response.NO_CONTENT).json({});
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postRecipe,
  validateRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  allowEditing,
  deleteRecipe,
};
