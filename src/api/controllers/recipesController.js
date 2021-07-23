const recipesService = require('../services/recipesService');

const registerRecipe = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;
  const { status,
    registeredRecipe } = await recipesService.registerRecipe(newRecipe, authorization);
  res.status(status).json({ recipe: registeredRecipe });
};

const getAllRecipes = async (_req, res) => {
  const { status, recipes } = await recipesService.getAllRecipes();
  res.status(status).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { status, recipe } = await recipesService.getRecipeById(id);
  res.status(status).json(recipe);
};

const editRecipe = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const edit = req.body;
  const { status, editedRecipe } = await recipesService.editRecipe(authorization, id, edit);
  res.status(status).json(editedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { status } = await recipesService.deleteRecipe(authorization, id);
  res.status(status).json();
};

const addRecipeImage = async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { status, recipe } = await recipesService.addRecipeImage(authorization, id);
    res.status(status).json(recipe);
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addRecipeImage,
};
