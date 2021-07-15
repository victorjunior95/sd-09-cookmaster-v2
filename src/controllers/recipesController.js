const express = require('express');
const recipesService = require('../services/recipesService');

const route = express.Router();

route.post('/recipes', async (req, res, next) => {
  try {
    const response = await recipesService.addRecipe(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
