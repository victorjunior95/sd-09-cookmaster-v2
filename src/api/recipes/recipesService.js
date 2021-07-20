const { ObjectID } = require('mongodb');
const RecipesModel = require('./recipesModel');

const create = async ({ name, ingredients, preparation, userId }) => {
  const { ops: [newRecipeEntry] } = await RecipesModel.create(
    { name, ingredients, preparation, userId },
  );
  return newRecipeEntry;
};

const getById = async ({ id }) => {
  const recipe = await RecipesModel.findByQuery(ObjectID(id));

  if (!recipe) return { error: 'recipeNotFound' };

  return recipe;
};

module.exports = {
  create,
  getById,
};
