const recipesService = require('../services/recipesServices');

const createRecipe = (req, res) => recipesService.createRecipe(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

const recipesList = (_req, res) => recipesService.recipesList()
  .then(({ status, data }) => res.status(status).json(data));

const getRecipeById = (req, res) => recipesService.getRecipeById(req.params.id)
  .then(({ status, recipe }) => res.status(status).json(recipe));

module.exports = { createRecipe, recipesList, getRecipeById };
