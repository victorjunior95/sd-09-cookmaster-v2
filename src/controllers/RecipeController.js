const { Router } = require('express');
const RecipeService = require('../services/RecipeService');

const RecipeRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQ = 400;
const HTTP_UNAUTHORIZED = 401;

RecipeRouter.post('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const recipeData = req.body;
    const resp = await RecipeService.create(recipeData, token);
    res.status(HTTP_CREATED).json({ recipe: resp });
  } catch (err) {
    if (err.message === 'invalid_data') {
      return next({ httpCode: HTTP_BAD_REQ, message: 'Invalid entries. Try again.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return next({ httpCode: HTTP_UNAUTHORIZED, message: err.message });
    }
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

module.exports = { RecipeRouter };
