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
  console.log('Model');
  try {
    const recipesData = await cookmasterDb().then((db) => db.collection('recipes'));
    const recipes = await recipesData.find().toArray();
    return recipes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerRecipe, getRecipes };
