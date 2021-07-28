const { ObjectID } = require('mongodb');
const cookmasterDb = require('./cookmasterDb');

const registerRecipe = async (recipeData) => {
  try {
    const recipesData = await cookmasterDb().then((db) => db.collection('recipes'));
    const { ops } = await recipesData.insertOne(recipeData);
    return ops[0];
  } catch (err) {
    console.log(err);
  }
};

const getRecipes = async () => {
  try {
    const recipesData = await cookmasterDb().then((db) => db.collection('recipes'));
    const recipes = await recipesData.find().toArray();
    return recipes;
  } catch (err) {
    console.log(err);
  }
};

const getRecipeById = async (id) => {
  try {
    const searchId = new ObjectID(id);
    const recipesData = await cookmasterDb().then((db) => db.collection('recipes'));
    const recipes = await recipesData.find({ _id: searchId }).toArray();
    return recipes[0];
  } catch (err) {
    console.log(err);
  }
};

const editRecipeById = async (id, newData) => {
  console.log(id);
  try {
    const searchId = new ObjectID(id);
    const recipesData = await cookmasterDb().then((db) => db.collection('recipes'));
    const updatedData = await recipesData.findOneAndUpdate(
      { _id: searchId },
      { $set: { ...newData } },
      { returnOriginal: false },
    );
    return updatedData.value;
  } catch (err) {
    console.log(err);
  }
};

const deleteRecipeById = async (id) => {
  try {
    const searchId = new ObjectID(id);
    const recipesData = await cookmasterDb().then((db) => db.collection('recipes'));
    await recipesData.remove({ _id: searchId });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { registerRecipe, getRecipes, getRecipeById, editRecipeById, deleteRecipeById };
