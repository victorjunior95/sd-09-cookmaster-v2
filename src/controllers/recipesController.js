const recipesServices = require('../services/recipesServices');

const postNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const result = await recipesServices.postNewRecipe({ name, ingredients, preparation, userId });

  res.status(201).json({ recipe: {
    name, ingredients, preparation, userId, _id: result,
  } });
};

const getAllRecipes = async (req, res) => {
  const result = await recipesServices.getAllRecipes();
  res.status(200).json(result);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const result = await recipesServices.getRecipeById(id);

  if (result.code) return next(result);

  res.status(200).json(result);
};

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
};
