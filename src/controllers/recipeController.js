const recipeServices = require('../services/recipeService');

const postRecipeController = async (req, res) => {
  const request = await recipeServices.postRecipeService(req);

  return res.status(request.status).json(request.response);
};

const getRecipeController = async (req, res) => {
  const request = await recipeServices.getAllRecipeService();

  return res.status(request.status).json(request.response);
};

const getRecipeByIdController = async (req, res) => {
  const { id } = req.params;
  const request = await recipeServices.getRecipeByIdService(id);

  return res.status(request.status).json(request.response);
};

const editRecipeController = async (req, res) => {
  const { id } = req.params;
  const { body, user } = req;
  const request = await recipeServices.editRecipeService(id, body, user);
  return res.status(request.status).json(request.response);
};

module.exports = {
  postRecipeController,
  getRecipeController,
  getRecipeByIdController,
  editRecipeController,
};