const express = require('express');
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
    return res.status(StatusCode.create).json({ recipe: created });
  } catch (err) {
    next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;