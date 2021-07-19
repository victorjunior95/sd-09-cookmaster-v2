const recipesService = require('../services/recipesService');

const recipesController = async (req, res, _next) => {
  const { id } = req.user;
 // console.log('users', users);
  const { name, ingredients, preparation } = req.body;
  console.log('service', name);
  const newRecipes = await recipesService.createRecipesService(name, ingredients, preparation, id);
  return res.status(201).json({ recipe: newRecipes });
};

module.exports = recipesController;