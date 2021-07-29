const service = require('../services/Recipes');

const createRecipe = async (req, res) => {
  const { name, preparation, ingredients } = req.body;
  const { _id: userId } = req.user;
  const result = await service.createRecipe(name, preparation, ingredients, userId);
  res.status(201).json({ recipe: result });
};

const fetchRecipes = async (req, res) => {
  const result = await service.fetchRecipes();
  res.status(200).json(result);
};

module.exports = {
  createRecipe,
  fetchRecipes,
};
