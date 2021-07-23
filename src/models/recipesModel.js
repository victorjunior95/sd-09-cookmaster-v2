const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipe }));
  return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return recipe;
};

const updateRecipe = async (id, recipe) => {
  if (!ObjectId.isValid(id)) return false;
  const updatedRecipe = await connection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...recipe } },
        { returnOriginal: false }));
  return updatedRecipe.value;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return true;
};

const addRecipeImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return false;
  const recipeWithImage = await connection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image } },
        { returnOriginal: false }));
  return recipeWithImage.value;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addRecipeImage,
};
