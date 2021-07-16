const RecipesService = require('../services/RecipesService');

const register = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { name, ingredients, preparation } = req.body;
    const newRecipe = await RecipesService.registerRecipe(
    token, { name, ingredients, preparation },
  );
  return res.status(201).json(newRecipe);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const updateRecipe = await RecipesService.update(token, { id, name, ingredients, preparation });
    return res.status(200).json(updateRecipe);
  } catch (err) {
    return next(err);
  }
};

const listRecipes = async (_req, res, next) => {
  try {
    const recipes = await RecipesService.listAllRecipes();

    return res.status(200).json(recipes);
  } catch (err) {
    return next(err);
  }
};

const listOneRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await RecipesService.findById(id);

    if (!recipe) return res.status(404).json({ message: 'Not found' });

    res.status(200).json(recipe);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  listRecipes,
  listOneRecipe,
  update,
};