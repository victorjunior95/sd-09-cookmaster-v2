const { recipe } = require('../services');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;

const ENTRIES_ERROR = 'Invalid entries. Try again.';
const RECIPE_NOT_FOUND_ERROR = 'recipe not found';

const addRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId, email, role } = req.user;

  if (!name || !ingredients || !preparation) {
    const err = new Error(ENTRIES_ERROR);

    err.statusCode = HTTP_BAD_REQUEST_STATUS;

    return next(err);
  }

  const newRecipe = await recipe.addRecipe(
    { name, ingredients, preparation },
    { userId, email, role },
  );

  if (newRecipe.statusCode) return next(newRecipe);
  
  res.status(HTTP_CREATED_STATUS).json(newRecipe);
};

const getRecipes = async (_req, res, _next) => {
  const recipes = await recipe.getRecipes();

  res.status(HTTP_OK_STATUS).send(recipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const foundRecipe = await recipe.getRecipeById(id);

  if (!foundRecipe) {
    const err = new Error(RECIPE_NOT_FOUND_ERROR);

    err.statusCode = HTTP_NOT_FOUND_STATUS;

    return next(err);
  }

  res.status(HTTP_OK_STATUS).json(foundRecipe);
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
};
