const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, id) => {
  const db = await connection();
  const addRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId: id });
  return addRecipe.ops[0];
};

const recipesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
};

const recipesByname = async (name) =>
  connection().then((db) => db.collection('recipes').findOne(name));

const getAll = () => connection().then((db) => db.collection('recipes').find().toArray());

module.exports = {
  createRecipes,
  recipesById,
  recipesByname,
  getAll,
};
