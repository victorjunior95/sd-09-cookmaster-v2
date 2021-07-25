const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });

  return recipe.ops[0];
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getOne = async (id) => {
  ObjectId(id);
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  create,
  getRecipes,
  getOne,
};