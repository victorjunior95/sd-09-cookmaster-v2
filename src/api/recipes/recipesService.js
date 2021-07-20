const { ObjectID } = require('mongodb');
const RecipesModel = require('./recipesModel');
const UsersModel = require('../users/usersModel');

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

const update = async ({ id, newData, userId }) => {
  let recipe = await getById({ id });
  const isUserOwner = recipe.userId === userId;
  let isUserAdmin = null;
  
  if (!isUserOwner) {
    const { role } = await UsersModel.findByQuery(ObjectID(userId));
    isUserAdmin = role === 'admin';
  }

  if (isUserOwner || isUserAdmin) {
    await RecipesModel.update(ObjectID(id), newData);
    recipe = await getById({ id });
  }

  return recipe;
};

module.exports = {
  create,
  getById,
  update,
};
