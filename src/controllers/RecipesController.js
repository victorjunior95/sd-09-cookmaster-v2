const RecipesService = require('../services/RecipesService');

const addNewRecipe = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next;
    const response = await RecipesService.addRecipe(req.body, token);
    return res.status(response.status).json(response.result);
  } catch (e) {
    console.log(e.message);
    console.log('Esse aq');
     next(e);
  }
};

const listRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await RecipesService.listRecipes(id);
    return res.status(response.status).json(response.result);
  } catch (e) {
    console.log(e.message);
    console.log('Esse aq');
    next({ status: 404, msg: 'recipe not found' });
  }
};

module.exports = {
  addNewRecipe,
  listRecipe,
};