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

const updateRcp = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const rcp = await Recipes.recipeUpdate(id, name, ingredients, preparation);
  
  return res.status(200).json(rcp);
});

const deletRcp = async (req, res) => {
  const { id } = req.params;
  await Recipes.deletRcp(id);

  return res.status(204).end();
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  oneRecp,
  updateRcp,
  deletRcp,
};