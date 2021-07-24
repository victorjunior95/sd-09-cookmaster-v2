const { findRecipes, findRecipe } = require('../../models/recipes');

const getRecipe = async () => {
  try {
    const response = await findRecipes();
    return { error: false, code: 'STATUS_OK', message: response };
  } catch (err) {
    return { error: true, code: 'STATUS_INTERNAL_ERROR', message: err };
  }
};

const getOne = async (id) => {
  try {
    const response = await findRecipe(id);
    if (!response.length) {
      return { error: true, code: 'STATUS_NOT_FOUND', message: 'recipeNotFound' };
    }

    return { error: false, code: 'STATUS_OK', message: response[0] };
  } catch (err) {
    return { error: true, code: 'STATUS_NOT_FOUND', message: 'recipeNotFound' };
  }
};

module.exports = { 
  getRecipe,
  getOne,
};
