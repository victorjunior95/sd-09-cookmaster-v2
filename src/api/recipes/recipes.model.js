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
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  return recipe;
};

const updateRecipeById = async (id, { name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  return recipe;
};

module.exports = {
  addRecipe,
  listRecipes,
  getRecipeById,
  updateRecipeById,
};
