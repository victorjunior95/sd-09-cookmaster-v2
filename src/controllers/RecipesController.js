const express = require('express');
const multer = require('multer');
const rescue = require('express-rescue');
const multerConfig = require('../config/multer');

const authorization = require('../middlewares/authorization');

const RecipesRouter = express.Router();

const RecipesService = require('../services/RecipesService');

RecipesRouter.post('/', rescue(authorization), rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const newRecipe = await RecipesService.createRecipe(name, ingredients, preparation, _id);
  return res.status(201).json(newRecipe);
}));

RecipesRouter.get('/', rescue(async (req, res) => {
  const allRecipes = await RecipesService.getAllRecipes();
  return res.status(200).json(allRecipes);
}));

RecipesRouter.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const oneRecipe = await RecipesService.getOneRecipe(id);
  return res.status(200).json(oneRecipe);
}));

RecipesRouter.put('/:id', rescue(authorization), rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await RecipesService.editRecipe(name, ingredients, preparation, id);
  return res.status(200).json(newRecipe);
}));

RecipesRouter.delete('/:id', rescue(authorization), rescue(async (req, res) => {
  const { id } = req.params;
  const deleted = await RecipesService.deleteRecipe(id);
  return res.status(204).json(deleted);
}));

RecipesRouter.put('/:id/image', rescue(authorization),
rescue(multer(multerConfig).single('image')),
rescue(async (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;
    const uploadedFile = await RecipesService.uploadFile(id, filename);
    return res.status(200).json(uploadedFile);
}));

module.exports = RecipesRouter;