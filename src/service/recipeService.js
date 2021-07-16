const RecipeModel = require('../model/recipeModel');

const create = async ({ _id: userId }, name, ingredients, preparation) => {
  const created = await RecipeModel.create(userId, name, ingredients, preparation);

  return created;
};

module.exports = {
  create,
};