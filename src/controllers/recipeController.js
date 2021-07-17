const path = require('path');
const middlewares = require('../middlewares');
const recipeService = require('../services/recipeService');
const httpStatus = require('./httpStatus');
const upload = require('../middlewares/upload');

const createRecipe = [
  middlewares.validateToken,
  middlewares.checkRecipeData,
  async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  const { _id } = user;

  const recipe = await recipeService.createRecipe(name, ingredients, preparation, _id);

  return res.status(httpStatus.CREATED).json(recipe);
}];

const getAllRecipes = async (_req, res) => {
  const recipes = await recipeService.getAllRecipes();

  return res.status(httpStatus.OK).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipeById(id);

  if (recipe.message) {
    return res.status(httpStatus.MOT_FOUND).json(recipe);
  }
  return res.status(httpStatus.OK).json(recipe);
};

const updateRecipe = [
  middlewares.validateToken,
  async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const { _id } = user;
    const recipeObject = { id, name, ingredients, preparation, _id };
    const updatedRecipe = await recipeService.updateRecipe(recipeObject);
    return res.status(httpStatus.OK).json(updatedRecipe);
  },
];

const deleteRecipe = [
  middlewares.validateToken,
  async (req, res) => {
    const { id } = req.params;
    const deletedRecipe = await recipeService.deleteRecipe(id);
    if (deletedRecipe) {
      return res.status(httpStatus.NO_CONTENT).json();
    }
  },
];

const updateRecipeImage = [
  upload.single('image'),
  middlewares.validateToken,
  async (req, res) => {
    const { filename } = req.file;
    const { id } = req.params;
    await recipeService.updateRecipeImage(id, filename);
    const updatedRecipe = await recipeService.getRecipeById(id);
    return res.status(httpStatus.OK).json(updatedRecipe);
  },
];

const getRecipeImage = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const imageId = `localhost:3000/src/uploads/${id}`; 
  const { image } = await recipeService.getRecipeImage(imageId);
  const imageUrl = image.split('/')[3];
  const IMAGE_PATH = path.join(__dirname, '..', `uploads/${imageUrl}`);
  res.setHeader('content-type', 'image/jpeg');
  return res.status(httpStatus.OK).sendFile(IMAGE_PATH);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
  getRecipeImage,
};