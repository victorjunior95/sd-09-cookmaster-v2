const {
  registerRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
  deleteRecipeByIdService,
} = require('../services/recipesService');

const registerRecipeController = async (req, res) => {
  const { body, payload: { _id: userId } } = req;
  const recipe = { ...body, userId };
  const result = await registerRecipeService(recipe);
  const { code, response } = result;
  return res.status(code).json(response);
};

const getAllRecipesController = async (_req, res) => {
  const result = await getAllRecipesService();
  const { code, response } = result;
  return res.status(code).json(response);
};

const getRecipeByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await getRecipeByIdService(id);
  const { code, response } = result;
  return res.status(code).json(response);
};

const updateRecipeByIdController = async (req, res) => {
  const { params: { id }, body, payload: { _id: userId } } = req;
  const result = await updateRecipeByIdService(id, body, userId);
  const { code, response } = result;
  return res.status(code).json(response);
};

const deleteRecipeByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await deleteRecipeByIdService(id);
  const { code, response } = result;
  return res.status(code).json(response);
};

module.exports = {
  registerRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
};
