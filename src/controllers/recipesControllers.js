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
    /* const code = error.code ? error.code : 404; */
    return next(error);
  }
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
};
