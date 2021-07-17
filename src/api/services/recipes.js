const recipes = require('../models/recipes');

const create = (recipeInfo, { _id: userId }) => recipes.create(recipeInfo, userId)
  .then((recipe) => ({ status: 201, recipe }));

const getAll = () => recipes.getAll().then((data) => ({ status: 200, data }));

const getById = (id) => recipes.getById(id).then((data) => ({ status: 200, data }));

module.exports = { create, getAll, getById };
