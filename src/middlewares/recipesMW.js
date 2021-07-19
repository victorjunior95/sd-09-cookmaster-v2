// const { ObjectId } = require('mongodb');
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

// const authUser = async (req, res, next) => {
//   const recipeId = req.params.id;
//   const { _id, role } = req.user;
//   try {
//     const foundRecipe = await RecipesServices.getRecipeById(recipeId);
//     if (foundRecipe.userId !== _id || !role === 'admin') return next(foundRecipe);
//     return next();
//   } catch (error) {
//     return error;
//   }
// };

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

module.exports = {
  postRecipe,
  validateRecipe,
  getAllRecipes,
  getRecipeById,
  // authUser,
  updateRecipe,
  allowEditing,
};
