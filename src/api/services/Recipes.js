const Recipe = require('../models/Recipes');

const invalidEntries = {
  status: 400,
  message: 'Invalid entries. Try again.',
};

const validateRecipeInfo = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return invalidEntries;
};

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const data = validateRecipeInfo(name, ingredients, preparation);

  if (data) return data;

  const create = await Recipe.registerRecipe(name, ingredients, preparation, userId);

  const { _id } = create;

  const result = {
    recipe: {
      _id,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
  // console.log(result);
  return result;
};

const listRecipes = async () => {
  const recipeList = await Recipe.listRecipes();

  return recipeList;
};

module.exports = {
  registerRecipe,
  listRecipes,
};
