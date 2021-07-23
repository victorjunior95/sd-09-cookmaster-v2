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

module.exports = {
  createRecipe,
  getAllRecipes,
};