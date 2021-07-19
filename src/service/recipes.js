const model = require('../model');
const response = require('../helpers/response');

const postRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return response(400, 'Invalid entries. Try again.');

  const {
    status,
    recipe,
    message,
  } = await model.recipes.postRecipe(name, ingredients, preparation, userId);

  return {
    status,
    recipe,
    message,
  };
};

const getAll = async () => {
  const result = await model.recipes.getAll();

  return result;
};

module.exports = {
  postRecipe,
  getAll,
};
