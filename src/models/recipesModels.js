const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertRecipe = async (recipeInfo) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeInfo }));

  return result.insertedId;
};

const postNewRecipe = async (recipeInfo) => {
  const result = await insertRecipe(recipeInfo);

  return result;
};

const getAllRecipes = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes').find({}).toArray());
  return result;
};

const getRecipeById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
    .catch((error) => ({ error: error.message }));

  if (result === null || !result.name) return ({ code: 404, message: 'Recipe not found' });

  return result;
};

const updateRecipe = async (data) => {
  const { id, ...payload } = data;

  const { modifiedCount } = await connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: payload }));
  return { modifiedCount };
};

const deleteRecipe = async (data) => {
  const { id } = data;
  const myRecipe = await getRecipeById(id);

  if (!myRecipe.name) return myRecipe;

  const { userId, role } = data;

  if (myRecipe.userId !== userId && role !== 'admin') {
    return { code: 401, message: 'Unauthorized' };
  }
  await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
return {};
};

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};