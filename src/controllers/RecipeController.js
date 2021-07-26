const { Router } = require('express');
const RecipeService = require('../services/RecipeService');

const RecipeRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_UNAUTHORIZED = 401;

RecipeRouter.post('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const recipeData = req.body;
    const resp = await RecipeService.create(recipeData, token);
    res.status(HTTP_CREATED).json({ recipe: resp });
  } catch (err) {
    next(err);
  }
});

RecipeRouter.get('/', async (_req, res, next) => {
  try {
    const resp = await RecipeService.getAll();
    res.status(HTTP_OK).json(resp);
  } catch (err) {
    next(err);
  }
});

RecipeRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const resp = await RecipeService.getById(id);
    res.status(HTTP_OK).json(resp);
  } catch (err) {
    next(err);
  }
});

RecipeRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const recipeData = req.body;
    const resp = await RecipeService.edit(id, recipeData, token);
    res.status(HTTP_OK).json(resp);
  } catch (err) {
    if (err.message === 'missing_token') {
      return next({ httpCode: HTTP_UNAUTHORIZED, message: 'missing auth token' });
    }
    next(err);
  }
});

module.exports = { RecipeRouter };
