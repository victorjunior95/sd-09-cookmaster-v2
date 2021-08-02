const path = require('path');

const service = require('../services/Recipes');
// const { upload } = require('../middlewares');

const createRecipe = async (req, res) => {
  const { name, preparation, ingredients } = req.body;
  const { _id: userId } = req.user;
  const result = await service.createRecipe(name, preparation, ingredients, userId); // colocar
  return res.status(201).json({ recipe: result });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findById(id);
  return res.status(200).json(result);
};

const fetchRecipes = async (req, res) => {
  const result = await service.fetchRecipes();
  return res.status(200).json(result);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, preparation, ingredients } = req.body;
  const recipe = await service.editRecipe(id, name, preparation, ingredients);
  return res.status(200).json(recipe);
};

const addImageToRecipe = async (req, res, _next) => {
      const { id } = req.params;
      const result = await service
        .addImageToRecipe(id, path.join('localhost:3000', 'src', 'uploads', `${id}.jpeg`));
      return res.status(200).json(result);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await service.deleteRecipe(id);
  return res.status(204).json(result);
};

module.exports = {
  createRecipe,
  fetchRecipes,
  findById,
  editRecipe,
  addImageToRecipe,
  deleteRecipe,
};
