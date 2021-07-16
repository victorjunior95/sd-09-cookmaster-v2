const connection = require('./connection');

const coll = 'recipes';

const addRecipe = async (name, ingredients, preparation, userId) => {
  const response = await connection().then((db) =>
    db.collection(coll).insertOne({ name, ingredients, preparation, userId }));

  const [recipe] = response.ops;

  return recipe;
};
const getRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection(coll).find().toArray());

  return recipes;
};

module.exports = {
  addRecipe,
  getRecipes,
};