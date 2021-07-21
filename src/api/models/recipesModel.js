const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
const result = await connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return result;
};

const getAllRecipes = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return result;
};

const getRecipesById = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesById,
};