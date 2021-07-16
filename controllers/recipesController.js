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

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { userId, userRole } = req;

  const infoToBeUpdated = { name, ingredients, preparation };

  const userData = { userId, userRole };

  const recipe = await recipesService.update(id, infoToBeUpdated, userData);

  if (!recipe) {
    return next({
      status: 200,
      message: 'denied.',
    });
  }

  return res.status(200).json(recipe);
});

const remove = rescue(async (req, res, next) => {
  const { userId, userRole } = req;
  const { id } = req.params;

  const userData = { userId, userRole };

  try {
    await recipesService.remove(id, userData);
    
    return res.status(204).end();
  } catch (error) {
    return next({
      status: 500,
      message: error.message,
    });
  }
});

const upload = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { userId, userRole } = req;
  const { filename } = req.file;

  const userData = { userId, userRole };
  
  const recipe = await recipesService.upload(id, filename, userData);

  if (!recipe) {
    return next({
      status: 401,
      message: 'something went wrong.',
    });
  }

  return res.status(200).json(recipe);
});

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
  upload,
};
