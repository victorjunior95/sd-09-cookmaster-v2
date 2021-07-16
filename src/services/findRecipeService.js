const recipes = require('../Models/recipes');

module.exports = async (id) => {
  const data = await recipes.findRecipeById(id);
  if (!data) return { code: 'notFound', err: { message: 'recipe not found' } };

  return data;
};
