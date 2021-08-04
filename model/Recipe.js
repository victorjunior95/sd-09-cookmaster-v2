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

module.exports = { create };