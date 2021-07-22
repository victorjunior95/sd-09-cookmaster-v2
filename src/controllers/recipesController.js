const recipesServices = require('../services/recipesServices');

async function addRecipe(req, res) {
  const { authorization } = req.headers;
  const { status, response } = await recipesServices.addRecipe(authorization, req.body);
  res.status(status).json(response);
}

module.exports = {
  addRecipe,
};
