const express = require('express');
const rescue = require('express-rescue');

const recipesServices = require('../services/recipesServices');
const validateJWT = require('../middlewares/validateJWT');
const { ok, created, notContent } = require('../utils/httpStatusCodes');

const recipesController = express.Router();

recipesController.get('/', rescue(async (_req, res) => {
  const recipes = await recipesServices.findAll();

  res.status(ok).json(recipes); 
}));

recipesController.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const recipe = await recipesServices.findById(id);

  res.status(ok).json(recipe); 
}));

recipesController.post('/', validateJWT, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = await recipesServices.create(name, ingredients, preparation, userId);

  return res.status(created).json({ recipe: newRecipe });
}));

recipesController.put('/:id', validateJWT, rescue(async (req, res) => {
    const { id: recipeId } = req.params;
    const recipeNewData = req.body;
    const { _id: userId, role } = req.user;

    const updatedRecipe = await recipesServices.update(
      recipeId,
      recipeNewData,
      userId,
      role,
    );

    return res.status(ok).json(updatedRecipe);
  }));

  recipesController.delete('/:id', validateJWT, rescue(async (req, res) => {
    const { id: recipeId } = req.params;
    const { _id: userId, role } = req.user;
  
    await recipesServices.exclude(recipeId, userId, role);
  
    return res.status(notContent).json();
  }));

module.exports = recipesController;
