const express = require('express');

const router = express.Router();
const recipesService = require('../services/recipesService');
const validation = require('../middlewares/validation');

const created = 201;
const ok = 200;
const noContent = 204;

router.post('/', validation, async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await recipesService.create({ name, preparation, ingredients, userId });

  if (recipe.error) return next(recipe);

  res
    .status(created)
    .json({ recipe: { name, ingredients, preparation, userId, _id: recipe.id } });
});

router.get('/', async (_req, res, _next) => {
  const recipes = await recipesService.getAll();

  return res.status(ok).json(recipes);
});

router.get('/:id', async (req, res, next) => {
  const recipe = await recipesService.getById(req.params.id);

  if (recipe.error) return next(recipe);

  return res.status(ok).json(recipe);
});

router.put('/:id', validation, async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipesService.update(name, ingredients, preparation, id);

  if (recipe.error) return next(recipe);

  const response = {
    _id: id, 
    userId, 
    name, 
    ingredients,
    preparation,
  };

  res.status(ok).json(response);
});

router.delete('/:id', validation, async (req, res, next) => {
 const recipe = await recipesService.deleteRecipe(req.params.id);
  if (recipe.error) return next(recipe);
  res.status(noContent).json('');
});

module.exports = router;