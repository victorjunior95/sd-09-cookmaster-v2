const { ObjectId } = require('mongodb');
const connection = require('./connection');

const coll = 'recipes';

const addRecipe = async (name, ingredients, preparation, userId) => {
  const response = await connection().then((db) =>
    db.collection(coll).insertOne({ name, ingredients, preparation, userId }));

  const [recipe] = response.ops;

  return recipe;
};
const listRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection(coll).find().toArray());

  return recipes;
};

const getRecipe = async (id) => {
  try {
    const recipe = await connection()
    .then((db) => db.collection(coll).findOne({ _id: new ObjectId(id) }));

    return recipe;
  } catch (error) {
    return null;
  }
};

module.exports = {
  addRecipe,
  listRecipes,
  getRecipe,
};