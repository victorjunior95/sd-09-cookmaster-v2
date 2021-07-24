const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async ({ name, preparation, ingredients }) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes'));
  const { insertedId } = await recipe
  .insertOne({ name, preparation, ingredients, url: 'url' });

  return {
    id: insertedId,
  };
};

const getAllRecipes = async () => {
  const recipesResult = await connection()
    .then((db) => db.collection('recipes'));

  const recipes = await recipesResult.find().toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  const recipesResult = await connection()
    .then((db) => db.collection('recipes'));

  const recipe = await recipesResult.findOne(new ObjectId(id));

  return recipe;
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  const recipeResult = await connection()
    .then((db) => db.collection('recipes'));

  await recipeResult
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  return { _id: id, name, ingredients, preparation };
};

const deleteRecipeById = async (id) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));

  const result = await recipesCollection
    .deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};