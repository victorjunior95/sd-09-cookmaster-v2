const recipesService = require('./recipes.service');

const addRecipe = async (req, res) => {
  try {
    const { body, headers: { authorization } } = req;

    const { status, data } = await recipesService.createRecipe(body, authorization);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const listRecipes = async (__, res) => {
  try {
    const { status, data } = await recipesService.listRecipes();

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

module.exports = { addRecipe, listRecipes };
