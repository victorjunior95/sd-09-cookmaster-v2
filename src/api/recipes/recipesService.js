const RecipesModel = require('./recipesModel');

const create = async ({ name, ingredients, preparation, userId }) => {
  const { ops: [newRecipeEntry] } = await RecipesModel.create(
    { name, ingredients, preparation, userId },
  );
  return newRecipeEntry;
};

module.exports = {
  create,
};
