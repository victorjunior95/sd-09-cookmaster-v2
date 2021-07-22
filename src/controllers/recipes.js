const recipesService = require('../services/recipes');

const createRecipe = async (req, res) => { 
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const recipe = await recipesService.create(name, ingredients, preparation, token);
    if (recipe.message) {
      res.status(400).json({ message: recipe.message });
    }
    res.status(201).json({ recipe });
};

const getRecipes = async (_req, res) => {
  const recipes = await recipesService.getAll();
  if (!recipes.message) {
    res.status(200).send({ recipes });
  }
  res.status(400).send({ message: 'recipes.err ' });
};

module.exports = {
  createRecipe,
  getRecipes,
};
