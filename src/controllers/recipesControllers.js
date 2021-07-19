const recipesServices = require('../services/recipesServices');

const {
  code: { CREATED, OK, NOT_FOUND, NO_CONTENT },
  message: { RECIPE_NOT_FOUND },
} = require('../utils');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = await recipesServices.createRecipes(name, ingredients, preparation, userId);

  return res.status(CREATED).json(newRecipe);
};

const getAllRecipes = async (req, res) => {
  const allRecipes = await recipesServices.getAllRecipes();
  if (!allRecipes.length) return res.status(204).json({ message: RECIPE_NOT_FOUND });

  return res.status(OK).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  const { id: recipeId } = req.params;
  const recipe = await recipesServices.getRecipeById(recipeId);
  if (!recipe) return res.status(NOT_FOUND).json({ message: RECIPE_NOT_FOUND });

  return res.status(OK).json(recipe);
};

const editRecipeById = async (req, res) => {
  const { id: recipeId } = req.params;
  const { body: payload } = req;
  const { _id: userId } = req.user;

  const editedRecipe = await recipesServices.editRecipeById(recipeId, userId, payload);

  return res.status(OK).json(editedRecipe);
};

const deleteRecipeById = async (req, res) => {
  const { id: recipeId } = req.params;

  await recipesServices.deleteRecipeById(recipeId);
  return res.status(NO_CONTENT).json();
};

const uploadImage = async (req, res) => {
  const { id: recipeId } = req.params;
  const image = req.file;

  const uploadRecipeImage = await recipesServices.uploadImage(recipeId, image);

  return res.status(OK).json(uploadRecipeImage);
};

const getRecipeImagesById = async (req, res) => {
  const { id: imageId } = req.params;

  const images = await recipesServices.getRecipeImagesById(imageId);
  return res.status(OK).json(images);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  getRecipeImagesById,
  uploadImage,
};