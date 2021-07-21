const recipesServeci = require('../service/recipesService');

const postNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const recipe = await recipesServeci.postNewRecipe({ name, ingredients, preparation });

  return res.status(201).send({
    recipe: {
      name,
      ingredients,
      preparation,
      userId: _id,
      _id: recipe.insertedId,
    },
  });
};

const getAllRecipes = async (_req, res) => {
  const recipes = await recipesServeci.getAllRecipes();
  return res.status(200).send(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServeci.getRecipeById(id);
  if (!recipe) return res.status(404).send({ message: 'recipe not found' });
  return res.status(200).send({ recipe });
};

module.exports = { postNewRecipe, getAllRecipes, getRecipeById };