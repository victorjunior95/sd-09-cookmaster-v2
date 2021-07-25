const connection = require('../connection/connection');

const registerRecipe = async (newRecipe) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').insertOne(newRecipe)).then(({ ops }) => ops[0]);
  return recipe;
};

const findRecipes = async () => connection().then((db) => db.collection('recipes').find({}));

module.exports = { registerRecipe, findRecipes };