const recipeService = require('../services/recipeService');

const registerRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const newRecipe = await recipeService.registerNewRecipe(name, ingredients, preparation, token);
  return res.status(201).json({ recipe: newRecipe });
};

const getAllRecipes = async (req, res, _next) => {
  const result = await recipeService.getRecipes();
  return res.status(200).json(result);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await recipeService.getById(id);
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const updateRecipe = async (req, res, _next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const result = await recipeService.update(id, name, ingredients, preparation);
  return res.status(200).json(result);
};

const deleteRecipe = async (req, res, _next) => {
  const { id } = req.params;
  await recipeService.deleteRes(id);
  return res.status(204).json();
};

const addImageToRecipe = async (req, res, _next) => {
  const { id } = req.params;
  const { path } = req.file;
  console.log(req.file);
  const result = await recipeService.addImage(id, path);
  return res.status(200).json(result);
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addImageToRecipe,
};
