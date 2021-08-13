const recipesService = require('../service/recipesService');

const verifyReq = (name, ingredients, preparation) => {
  const params = [name, ingredients, preparation];
  let res = null;

  params.forEach((param) => {
    if (typeof param !== 'string') res = { message: 'Invalid entries. Try again.' };
  });

  return res;
};

const postRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  const invalidEntries = verifyReq(name, ingredients, preparation);

  if (invalidEntries) {
    return res.status(400).json(invalidEntries);
  }

  const newRecipe = await recipesService.postRecipes(name, ingredients, preparation, user);
  return res.status(201).json(newRecipe);
};

const getRecipes = async (_req, res) => {
  const recipes = await recipesService.getRecipes();

  return res.status(200).json(recipes);
};

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getRecipesById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
};

module.exports = { postRecipes, getRecipes, getRecipesById };
