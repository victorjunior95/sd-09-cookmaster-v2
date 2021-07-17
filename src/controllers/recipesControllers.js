const recipesServices = require('../services/recipesServices');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  console.log('=========userId=======>>>> ')

  const newRecipe = await recipesServices.createRecipes(name, ingredients, preparation, userId);
  console.log('==================newRecipe================', newRecipe)

};

module.exports = {
  createRecipes,
};