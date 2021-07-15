// recipesModel
const connection = require('./connection');

const addRecipe = async (recipeObject) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').insertOne(recipeObject));
  return recipe.ops[0];
};

const findAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const findOneRecipe = async (recipeObject) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(recipeObject));
  return recipe;
};

module.exports = {
  addRecipe,
  findAllRecipes,
  findOneRecipe,
};