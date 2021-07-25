const recipesServices = require('../services/recipesServices');

async function addRecipe(req, res) {
  const { authorization } = req.headers;
  const { status, response } = await recipesServices.addRecipe(authorization, req.body);
  return res.status(status).json(response);
}

async function getRecipe(_req, res) {
  const { status, response } = await recipesServices.getRecipe();
  return res.status(status).json(response);
}

async function getRecipeById(req, res) {
  const { id } = req.params;
  const { status, response } = await recipesServices.getRecipeById(id);
  return res.status(status).json(response);
}

async function editRecipe(req, res) {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const { status, response } = await recipesServices.editRecipe(id, token, req.body);
  return res.status(status).json(response);
}

async function deleteRecipe(req, res) {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const { status } = await recipesServices.deleteRecipe(id, token);
  return res.status(status).json();
}

async function addRecipeImage(req, res) {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const { filename } = req.file;
  const { status, response } = await recipesServices.addRecipeImage(id, token, filename);
  return res.status(status).json(response);
}

module.exports = {
  addRecipe,
  getRecipe,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addRecipeImage,
};
