const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const response = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return { recipe: {
    ...response.ops[0],
    },
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const response = await db.collection('recipes').find({}).toArray();
  return response;
};

const getOneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return response;
};

const editRecipe = async (name, ingredients, preparation, id) => {
  if (!ObjectId.isValid(id)) return null;
  console.log(name, ingredients, preparation, id);
  const db = await connection();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const newRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return newRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  editRecipe,
};