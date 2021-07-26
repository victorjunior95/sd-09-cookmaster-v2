const recipesServices = require('../services/recipesServices');
const validateToken = require('../services/usersServices/validateToken');
const validateEntries = require('../services/recipesServices/validateEntries');

const created = 201;
const okay = 200;
const notFound = 404;
const noContent = 204;

const insertRecipe = [
  validateToken,
  validateEntries,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user: { _id: userId } } = req;
    const insertedRecipe = await recipesServices.insertRecipe(
      { name,
        ingredients,
        preparation,
        userId,
      },
    );
    return res.status(created).json(insertedRecipe);
  },
];

const getAllRecipes = async (_req, res) => {
  const allRecipes = await recipesServices.getAllRecipes();
  return res.status(okay).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipeById = await recipesServices.getRecipeById(id);
  if (recipeById.message) {
    return res.status(notFound).json(recipeById);
  }
  return res.status(okay).json(recipeById);
};

const updateRecipeById = [
  validateToken,
  validateEntries,
  async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const updatedRecipe = await recipesServices
      .updateRecipeById(id, name, ingredients, preparation);
    return res.status(okay).json(updatedRecipe);
  },
];

const deleteRecipeById = [
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    const deletedRecipe = await recipesServices.deleteRecipeById(id);
    return res.status(noContent).json(deletedRecipe);
  },
];

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
