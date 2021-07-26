const { ObjectId } = require('mongodb');
const connect = require('../api/connect');

const RECIPES = 'recipes';
const createRecipes = async (recipes) => {
  try {
    const { name, ingredients, preparation, userId } = recipes;
    const db = await connect();
    const result = await db.collection(RECIPES).insertOne({
      name,
      ingredients,
      preparation,
      userId,
    });
    return result.ops[0];
  } catch (error) {
    return { error: error.message };
  }
};

const getRecipes = async () => {
  try {
    const db = await connect();
    const result = await db.collection(RECIPES).find().toArray();
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const findRecipes = async (recipeId) => {
  try {
    const db = await connect();
    const result = await db.collection(RECIPES).findOne({ _id: ObjectId(recipeId) });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const updateRecipes = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  try {
    const recipeUpdate = await connect()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    ));
  
    return recipeUpdate.value;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteRecipes = async (recipeId) => {
  try {
    const db = await connect();
    const result = await db.collection(RECIPES).removeOne({ _id: ObjectId(recipeId) });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const imageUpdate = async (recipeId, image) => {
  const db = await connect();
  const result = await db.collection(RECIPES)
    .updateOne({ _id: ObjectId(recipeId) }, { $set: { image } });
  return result;
};

module.exports = {
  createRecipes,
  getRecipes,
  findRecipes,
  updateRecipes,
  deleteRecipes,
  imageUpdate,
};
