const recipesServices = require('../services/recipesServices');

async function addRecipe(req, res) {
  const { authorization } = req.headers;
  const { status, response } = await recipesServices.addRecipe(authorization, req.body);
  res.status(status).json(response);
}

async function getRecipe(_req, res) {
  const { status, response } = await recipesServices.getRecipe();
  res.status(status).json(response);
}

module.exports = {
  addRecipe,
  getRecipe,
};
