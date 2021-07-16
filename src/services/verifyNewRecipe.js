const recipes = require('../Models/recipes');

module.exports = async (body, userId) => {
  const { name, ingredients, preparation } = body;
  if (!name || !ingredients || !preparation) {
    return { code: 'bad_request', err: { message: 'Invalid entries. Try again.' } };
  }

  const data = await recipes.createRecipe(name, ingredients, preparation, userId);
  return data;
};
