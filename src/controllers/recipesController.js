const recipesService = require('../service/recipesService');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NO_CONTENT = 204;

const createRecipe = async (req, res, _next) => {
  const { user: { _id: userId }, body: recipe } = req;
  const result = await recipesService.createRecipe(userId, recipe);
  res.status(HTTP_STATUS_CREATED).json(result);
};

const getAllRecipes = async (_req, res, _next) => {
  const result = await recipesService.getAllRecipes();
  res.status(HTTP_STATUS_OK).json(result);
};

const findRecipe = async (req, res, _next) => {
  const { id } = req.params;
  const result = await recipesService.findRecipe(id);
  res.status(HTTP_STATUS_OK).json(result);
};

const editRecipe = async (req, res, _next) => {
  const { id } = req.params;
  const { user, body: editedRecipe } = req;
  const result = await recipesService.editRecipe(id, user, editedRecipe);
  res.status(HTTP_STATUS_OK).json(result);
};

const deleteRecipe = async (req, res, _next) => {
  const { id } = req.params;
  const { user } = req;
  await recipesService.deleteRecipe(id, user);
  res.status(HTTP_STATUS_NO_CONTENT).json();
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipe,
  editRecipe,
  deleteRecipe,
};
