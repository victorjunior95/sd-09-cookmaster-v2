const recipes = require('../services/recipes');

const create = async (req, res) => {
  const { body, user } = req;
  const { status, ...jsonResponse } = await recipes.create(body, user);
  res.status(status).json(jsonResponse);
};

const getAll = async (_req, res) => {
  const { status, recipesList } = await recipes.getAll();
  res.status(status).json(recipesList);
};

module.exports = { create, getAll };