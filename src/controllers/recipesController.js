const rescue = require('express-rescue');
const Recipes = require('../service/recipesServices');

const createNewRecipe = rescue(async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const recipes = await Recipes.createNewRecipesService(
    name, ingredients, preparation, userId,
  );

  return res.status(201).json(recipes);
});

const getAllRecipes = async (_req, res) => {
  const recipes = await Recipes.allRecipes();

  return res.status(200).json(recipes);
};

const oneRecp = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getOneRecipe(id);
  
  return res.status(200).json(recipe);
});

module.exports = {
  createNewRecipe,
  getAllRecipes,
  oneRecp,
};