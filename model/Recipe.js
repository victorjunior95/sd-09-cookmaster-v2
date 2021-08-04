const connection = require('./connection');

const formatRecipe = ({ name, ingredients, preparation, userId, _id }) => ({ name,
  ingredients,
  preparation,
  userId,
  _id });

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const createNew = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const result = createNew.ops[0];
  return formatRecipe(result);
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes.map(formatRecipe);
};

module.exports = { create, getAll };