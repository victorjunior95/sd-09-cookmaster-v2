const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getInsertedRecipe = (recipeInfos) => {
  const { _id, name, ingredients, preparation, userId } = recipeInfos;
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    },
  };
};

const insertRecipe = async (newRecipe) => connection()
    .then((db) => db.collection('recipes').insertOne(newRecipe))
    .then((result) => getInsertedRecipe(
      {
        _id: result.insertedId,
        ...newRecipe,
      },
    ));

const getAllRecipes = async () => connection()
    .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes').findOneAndUpdate({ _id: ObjectId(id) },
    {
      $set: {
        name,
        ingredients,
        preparation,
      },
    },
    {
      returnOriginal: false,
    }))
    .then((result) => result.value);
};

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
};
