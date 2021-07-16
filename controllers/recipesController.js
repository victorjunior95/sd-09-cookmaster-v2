const rescue = require('express-rescue');
const recipesService = require('../services/recipesServices');

const add = rescue(async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;

  const recipe = await recipesService.add(
    name,
    ingredients,
    preparation,
    userId,
  );

  return res.status(201).json(recipe);
});

const getAll = rescue(async (_req, res) => {
  const recipes = await recipesService.getAll();

  return res.status(200).json(recipes);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await recipesService.getById(id);

  if (!recipe) {
    return next({
      status: 404,
      message: 'recipe not found',
    });
  }

  return res.status(200).json(recipe);
});

module.exports = {
  add,
  getAll,
  getById,
};
