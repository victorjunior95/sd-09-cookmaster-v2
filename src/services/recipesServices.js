const recipesModel = require('../models/recipesModel');

const createRecipe = (newRecipe, { _id: userId }) =>
  recipesModel.createRecipe({ ...newRecipe, userId })
    .then((recipe) => ({ status: 201, recipe }));

const recipesList = () => recipesModel.recipesList()
  .then((data) => ({ status: 200, data }));

const getRecipeById = (id) => recipesModel.getRecipeById(id)
  .then((recipe) => ({ status: 200, recipe }));

const updateRecipe = (id, recipe, { _id: userId }) =>
  recipesModel.updateRecipe(id, { ...recipe, userId })
  .then(() => ({ status: 200, userId }));

const removeRecipe = (id) => recipesModel.removeRecipe(id)
  .then(() => ({ status: 204 }));

module.exports = { createRecipe, recipesList, getRecipeById, updateRecipe, removeRecipe };
