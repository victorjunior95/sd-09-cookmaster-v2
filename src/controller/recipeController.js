const express = require('express');
const upload = require('../middlewares/upload');
const Validation = require('../middlewares/validation');
const RecipeService = require('../service/recipeService');
const ErrorHandler = require('../middlewares/errorHandler');
const StatusCode = require('../statusCode');

const router = express.Router();

router.post('/', Validation.token, Validation.createRecipe, async (req, res, next) => {
  try {
    const { user } = req;
    const { name, ingredients, preparation } = req.body;
    const created = await RecipeService.create(user, name, ingredients, preparation);
    return res.status(StatusCode.created).json({ recipe: created });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (_req, res) => {
  const recipesList = await RecipeService.findAll();
  return res.status(StatusCode.ok).json(recipesList);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await RecipeService.findById(id);
    return res.status(StatusCode.ok).json(recipe);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', Validation.token, Validation.createRecipe, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const updated = await RecipeService.update(id, { name, ingredients, preparation });
    return res.status(StatusCode.ok).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', Validation.token, async (req, res, next) => {
  try {
    const { id } = req.params;
    await RecipeService.remove(id);
    return res.status(StatusCode.notContent).json();
  } catch (err) {
    next(err);
  }
});

router.put('/:id/image', Validation.token, upload, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await RecipeService.uploadImage(id);
    return res.status(StatusCode.ok).json(updated);
  } catch (err) {
    console.log('entrei');
    next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;