const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) =>
    db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return recipe;
};

const updateRecipe = async (id, userId, recipe) => {
  await connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { recipe } }));
  return { _id: id, ...recipe, userId };
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return deletedRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  updateRecipe,
  deleteRecipe,
};