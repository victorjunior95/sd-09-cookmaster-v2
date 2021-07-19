const rescue = require('express-rescue');
const Recipes = require('../Services/recipesService');

const recipeCreate = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipes = await Recipes.recipeCreate(
    name, ingredients, preparation, req.userId,
  );

  return res.status(201).json(recipes);
});

const getAll = async (_req, res) => {
  const recipes = await Recipes.getAll();

  return res.status(200).json(recipes);
};

const getOne = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getOne(id);
  
  return res.status(200).json(recipe);
});

module.exports = {
  recipeCreate,
  getAll,
  getOne,
};