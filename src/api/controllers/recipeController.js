const multer = require('multer');
const recipeService = require('../services/recipeService');

const stateBadRequest = 400;
const stateUnauthorized = 401;
const stateNotFound = 404;
const stateOk = 200;
const stateCreated = 201;
const stateNoContent = 204;

const createNewRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = await recipeService.createRecipe(name, ingredients, preparation, userId);

  if (newRecipe.message) return res.status(stateBadRequest).json(newRecipe);

  return res.status(stateCreated).json(newRecipe);
};

const showAllRecipes = async (req, res, _next) => {
  const list = await recipeService.allRecipes();
  return res.status(stateOk).json(list);
};

const findRecipeById = async (req, res, _next) => {
  const { id } = req.params;
  const recipe = await recipeService.findRecipe(id);

  if (recipe.message) return res.status(stateNotFound).json(recipe);

  return res.status(stateOk).json(recipe);
};

const updateRecipeData = async (req, res, _next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const updatedRecipe = await recipeService.updateRecipe(name, ingredients, preparation, id);

  if (updatedRecipe.message) return res.status(stateUnauthorized).json(updatedRecipe);

  return res.status(stateOk).json(updatedRecipe);
};

const deleteRecipeData = async (req, res, _next) => {
  const { id } = req.params;
  const deletedRecipe = await recipeService.deleteRecipe(id);

  return res.status(stateNoContent).json(deletedRecipe);
};

const uploadToFolder = (id) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'src/uploads'),
    filename: (req, file, callback) => callback(null, `${id}.jpeg`),
  });
  console.log(storage);
};

const addNewRecipeImage = async (req, res, _next) => {
  const { id } = req.params;
  const imageSrc = `localhost:3000/src/uploads/${id}.jpeg`;
  const updatedRecipe = await recipeService.addRecipeImage(imageSrc, id);

  if (updatedRecipe.message) return res.status(stateUnauthorized).json(updatedRecipe);
  
  uploadToFolder(id);

  return res.status(stateOk).json(updatedRecipe);
};

const showImage = async (req, res, _next) => {
  const { id } = req.params;
  const selectRecipe = await recipeService.findRecipe(id);
  return res.status(stateOk).json(selectRecipe.image);
};

module.exports = {
  createNewRecipe,
  showAllRecipes,
  findRecipeById,
  updateRecipeData,
  deleteRecipeData,
  addNewRecipeImage,
  showImage,
};