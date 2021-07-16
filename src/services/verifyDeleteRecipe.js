const { deleteRecipeById } = require('../Models/recipes');

module.exports = async (id) => {
  const data = await deleteRecipeById(id);
  if (!data) {
    return {
      code: 'not_found',
      err: { message: 'recipe not found' },
    };
  }

  return data;
};