const { allRecipes } = require('../models');

const getAllRecipes = async (_req, res) => {
  const recipesList = await allRecipes();

  return res.status(200).json(recipesList);
};

module.exports = getAllRecipes;
