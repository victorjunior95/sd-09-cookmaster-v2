const { Router } = require('express');
const RecipeService = require('../services/RecipeService');
const UploadMiddleware = require('../middlewares/UploadMiddleware');
const TokenMiddleware = require('../middlewares/TokenMiddleware');

const RecipeRouter = Router();

const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;
const HTTP_CREATED = 201;

RecipeRouter.post('/', TokenMiddleware, async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const recipeData = req.body;
    const resp = await RecipeService.create(recipeData, userId);
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

RecipeRouter.put('/:id', TokenMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeData = req.body;
    const resp = await RecipeService.edit(id, recipeData);
    res.status(HTTP_OK).json(resp);
  } catch (err) {
    next(err);
  }
});

RecipeRouter.delete('/:id', TokenMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    await RecipeService.deleteRecipe(id);
    res.status(HTTP_NO_CONTENT).json();
  } catch (err) {
    next(err);
  }
});

RecipeRouter.put(
  '/:id/image',
  TokenMiddleware,
  UploadMiddleware.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await RecipeService.insertImg(id);
      res.status(HTTP_OK).json(resp);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { RecipeRouter };
