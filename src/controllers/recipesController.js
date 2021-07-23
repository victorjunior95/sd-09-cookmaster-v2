const express = require('express');
const { validateToken, verifyToken } = require('../middlewares/auth');
const recipesService = require('../services/recipesService');
const { validateRecipe } = require('../middlewares/validateRecipe');

const router = express.Router();
const responseCodes = {
  success: 200,
  created: 201,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      verifyToken(token);
    }
    const recipes = await recipesService.getAllRecipes();
    res.status(responseCodes.success).json(recipes);  
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.findRecipeById(id);
  res.status(responseCodes.success).json(recipe);
});

router.post('/', validateToken, validateRecipe, async (req, res) => {
  const reqRecipe = req.body;
  const { _id } = req.user;
  reqRecipe.userId = _id;
  const recipe = await recipesService.addRecipe(reqRecipe);
  res.status(responseCodes.created).json(recipe);
});
module.exports = router;
