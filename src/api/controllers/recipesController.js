const recipesService = require('../services/recipesService');

const CREATED = 201;
const OK = 200;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await recipesService.createRecipe(name, ingredients, preparation);

  if (newRecipe.isError) return res.status(newRecipe.status).json({ message: newRecipe.message });
  return res.status(CREATED).json({ 
    recipe: newRecipe,
  });
};

const getAllRecipes = async (req, res) => {
  const result = await recipesService.getAllRecipes();
  return res.status(OK).json(result);
  };

module.exports = {
  createRecipe,
  getAllRecipes,
};