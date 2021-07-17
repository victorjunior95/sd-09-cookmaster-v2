const recipesServices = require('../services/recipesServices');

const { code: { CREATED } } = require('../utils');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;

  const newRecipe = await recipesServices.createRecipes(name, ingredients, preparation, userId);
  return res.status(CREATED).json(newRecipe);
};

module.exports = {
  createRecipes,
};