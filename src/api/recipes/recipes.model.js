const { ObjectId } = require('mongodb');
const connection = require('../connection');

const addRecipe = async (newRecipe) => {
  const db = await connection();

  const { ops } = await db.collection('recipes').insertOne(newRecipe);

  return ops[0];
};

const listRecipes = async () => {
  const db = await connection();

  const recipesList = await db.collection('recipes').find().toArray();

  return recipesList;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const recipes = await db.collection('recipes').findOne(ObjectId(id));

  return recipes;
};

module.exports = {
  addRecipe,
  listRecipes,
  getRecipeById,
};
