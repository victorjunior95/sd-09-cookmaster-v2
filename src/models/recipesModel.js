const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne(recipe);
  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const findRecipeById = async (id) => {
  const db = await connection();
  const result = await db.collection('recipes').findOne(ObjectId(id));
  return result;
};

const updateRecipe = async (id, { name, ingredients, preparation }) => {
  const query = { $set: { name, ingredients, preparation } };
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, query); 
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
};
