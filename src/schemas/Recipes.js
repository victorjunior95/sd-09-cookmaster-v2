const { messages, codes, objectError } = require('./ErrorHandling');
const { getRecipeById } = require('../models/Recipes');

const recipeValidator = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return objectError(messages.INVALID_ENTRIES, codes.CODE_400);
  }
  return {};
};

const idValidator = async (id) => {
  try {
    const recipe = await getRecipeById(id);
    const { result } = recipe;
    if (!result) return objectError(messages.INVALID_RECIPE, codes.CODE_404);
    return recipe;
  } catch (error) {
    return objectError(messages.INVALID_RECIPE, codes.CODE_404);
  }
};

module.exports = { recipeValidator, idValidator };