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

const updateRecipe = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const response = await RecipesService.updateRecipe(id, req.body, token);
    return res.status(response.status).json(response.result);
  } catch (e) {
    console.log(e.message);
    console.log('Esse aq');
     next(e);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const response = await RecipesService.deleteRecipe(id, token);
    return res.status(response.status).json(response.result);
  } catch (e) {
    console.log(e.message);
    console.log('Esse aq');
    next(e);
  }
};

module.exports = {
  addNewRecipe,
  listRecipe,
  updateRecipe,
  deleteRecipe,
};