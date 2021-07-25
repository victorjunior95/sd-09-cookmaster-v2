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

module.exports = {
  addRecipe,
  getRecipe,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
