const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getNewRecipe = (recipeData) => {
  const { _id, name, ingredients, preparation, userId } = recipeData;

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

const createRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId })
    .then((result) => getNewRecipe({ 
      _id: result.insertedId, name, ingredients, preparation, userId })));

const getAllRecipes = async () => connection()
    .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};