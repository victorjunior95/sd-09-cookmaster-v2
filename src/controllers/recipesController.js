const express = require('express');
const recipesService = require('../services/recipesService');
const validateJWT = require('../api/auth/validateJWT');

const route = express.Router();

route.post('/recipes', validateJWT, async (req, res, next) => {
  try {
    const response = await recipesService.addRecipe(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
});

route.get('/recipes', async (_req, res, next) => {
  try {
    const response = await recipesService.getAllRecipes();
    res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
