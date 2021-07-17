const express = require('express');

const router = express.Router();
const recipesService = require('../services/recipesService');
const validation = require('../middlewares/validation');

const statusSucessCreate = 201;

router.post('/', validation, async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await recipesService.create({ name, preparation, ingredients, userId });

  if (recipe.error) return next(recipe);

  res
    .status(statusSucessCreate)
    .json({ recipe: { name, ingredients, preparation, userId, _id: recipe.id } });
});

module.exports = router;