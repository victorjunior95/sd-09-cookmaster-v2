const rescue = require('express-rescue');
const RecipeService = require('../services/RecipeService');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipeService.create(name, ingredients, preparation);

  return res.status(201).json({ recipe });
});

module.exports = {
  create,
};