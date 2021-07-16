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

const getUpdatedRecipe = (recipeData) => {
  const { _id, name, ingredients, preparation, userId } = recipeData;

  return {
    _id,
    name,
    ingredients,
    preparation,
    userId,
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

const updateRecipe = async (productData) => {
  const { id, name, ingredients, preparation, _id } = productData;
  if (!ObjectId.isValid(id)) return null;
  return connection()
  .then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation, userId: _id } },
    )).then(() => getUpdatedRecipe(
      { _id: ObjectId(id), name, ingredients, preparation, userId: _id },
      ));
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};