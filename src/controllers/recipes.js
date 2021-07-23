const recipesService = require('../services/recipes');

const createRecipe = async (req, res) => { 
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const recipe = await recipesService.create(name, ingredients, preparation, token);
    if (!recipe) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }  
    return res.status(201).json({ recipe });
};

const getRecipes = async (_req, res) => {
  try {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
  } catch (message) {
    return res.status(400).json({ message });
  }
};

const getOneRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getOne(id);
  if (!recipe) { 
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipe);
};

module.exports = {
  createRecipe,
  getRecipes,
  getOneRecipe,
};
