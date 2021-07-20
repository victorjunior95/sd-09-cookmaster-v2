const express = require('express');
const rescue = require('express-rescue');

const recipesServices = require('../services/recipesServices');
const validateJWT = require('../middlewares/validateJWT');
const { created } = require('../utils/httpStatusCodes');

const recipesController = express.Router();

recipesController.post('/', validateJWT, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = await recipesServices.create(name, ingredients, preparation, userId);

  return res.status(created).json({ recipe: newRecipe });
}));

module.exports = recipesController;
