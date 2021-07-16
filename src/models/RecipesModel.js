const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  if (!newRecipe) return null;
  return newRecipe;
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = db.collection('recipes').find().toArray();
  if (!recipes) return null;
  return recipes;
};

const getRecipeByid = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = db.collection('recipes').findOne(ObjectId(id));
  if (!recipe) return null;
  return recipe;
};

const updateRecipe = async (id, body, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { body, userId } });
  return recipe;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const deleted = await connection().then((db) => db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));
  return deleted;
};

const insertUrlImage = async (id, url) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image: url } });
  return recipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeByid,
  updateRecipe,
  deleteRecipe,
  insertUrlImage,
};