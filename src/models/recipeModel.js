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

const updateRecipeImage = async (id, filename) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
  .then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/src/uploads/${filename}` } },
    ));
};

const getRecipeImage = async (imageId) => connection()
  .then((db) => db.collection('recipes').findOne({ image: imageId }));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
  getRecipeImage,
};