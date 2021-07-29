const service = require('../services/Recipes');

const createRecipe = async (req, res) => {
  const { name, preparation, ingredients } = req.body;
  const { _id: userId } = req.user;
  const result = await service.createRecipe(name, preparation, ingredients, userId);
  res.status(201).json({ recipe: result });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findById(id);
  res.status(200).json(result);
};

const fetchRecipes = async (req, res) => {
  const result = await service.fetchRecipes();
  res.status(200).json(result);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, preparation, ingredients } = req.body;
  // const { _id } = req.user;
  const recipe = await service.editRecipe(id, name, preparation, ingredients);
  res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await service.deleteRecipe(id);
  res.status(204).json(result);
};

module.exports = {
  createRecipe,
  fetchRecipes,
  findById,
  editRecipe,
  deleteRecipe,
};
