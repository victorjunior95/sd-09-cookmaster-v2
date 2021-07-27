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

module.exports = { registerRecipe, getRecipes, getRecipeById };
