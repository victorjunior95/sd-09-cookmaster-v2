const recipesService = require('../services/recipes');

const createRecipe = async (req, res) => { 
  try {  
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const recipe = await recipesService.create(name, ingredients, preparation, token);
    return res.status(201).json({ recipe });
  } catch (message) {
    return res.status(400).json({ message });
  } 
};

const getRecipes = async (_req, res) => {
  try {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
  } catch (message) {
    return res.status(400).json({ message });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
};
