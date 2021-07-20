const recipesService = require('../services/recipes');

const createRecipe = async (req, res) => { 
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const recipe = await recipesService.create(name, ingredients, preparation, token);
    if (!recipe.message) {
      res.status(201).json({ recipe });
    }
    res.status(400).json({ message: recipe.message });
};

module.exports = {
  createRecipe,
};
