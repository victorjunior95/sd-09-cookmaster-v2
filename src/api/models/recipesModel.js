const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipe = async (recipe) => {
  const db = await connection();
  const register = await db.collection('recipes').insertOne(recipe);
  // o insertProduct.ops retorna um array que na posiçao zero tem a minha inserção
  return register.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const editRecipe = async (id, edit) => {
  const { name, ingredients, preparation } = edit;
  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  const editedRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return editedRecipe;
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
};