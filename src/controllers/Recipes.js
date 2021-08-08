const rescue = require('express-rescue');
const RecipesService = require('../services/Recipes');
const upload = require('../schemas/UploadConfig');

const createRecipe = rescue(async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const { result, code } = await RecipesService.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  res.status(code).json(result);
});

const getAllRecipes = rescue(async (req, res) => {
  const { result, code } = await RecipesService.getAllRecipes();
  res.status(code).json(result);
});

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const { result, code } = await RecipesService.getRecipeById(id);
  res.status(code).json(result);
});

const editRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const { result, code } = await RecipesService.editRecipe(
    userId,
    { id, name, ingredients, preparation },
    );
  res.status(code).json(result);
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req;
  const { result, code } = await RecipesService.deleteRecipe(id, userId, role);
  res.status(code).json(result);
});

const insertImage = [
  upload.single('image'),
  rescue(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req;
  const { result, code } = await RecipesService.insertRecipe(id, userId, req.file.path, role);
  res.status(code).json(result);
})];

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  insertImage,
};