const recipesService = require('../services/recipesService');
// const validateToken = require('../middlewares/validateToken');

const recipesController = async (req, res, _next) => {
  const { id } = req.user;
 // console.log('users', users);
  const { name, ingredients, preparation } = req.body;
  // console.log('service', name);
  const newRecipes = await recipesService.createRecipesService(name, ingredients, preparation, id);
  return res.status(201).json({ recipe: newRecipes });
};

const listRecipeController = async (_req, res) => {
  // const token = req.header.authorization;
  // console.log('token: ', token);
  const listRecipes = await recipesService.listRecipesService();

  return res.status(200).json(listRecipes);
};
module.exports = {
  recipesController,
  listRecipeController,
};