const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((recipe) => ({ name, ingredients, preparation, userId, _id: recipe.insertedId }));

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((recipes) => (recipes));

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .then((recipe) => (recipe));
};

const editRecipeById = async (recipeId, userId, payload) => {
  if (!ObjectId.isValid(recipeId)) return null;

  const { name, ingredients, preparation } = payload;

  return connection()
    .then((db) => db.collection('recipes').updateOne({ id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } }))
    .then(() => ({ _id: recipeId, name, ingredients, preparation, userId }));
};

const deleteRecipeById = async (recipeId) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(recipeId) }));

const getRecipeImagesById = async (imageId) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(imageId)))
  .then();

const uploadImage = async (recipeId, recipeUpDated) => connection()
  .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(recipeId) },
    { $set: recipeUpDated }));

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  getRecipeImagesById,
  uploadImage,
};