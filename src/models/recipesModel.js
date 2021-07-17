const connection = require('./connection');

const create = async (recipe) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne(recipe);
  return { recipe: result };
};

module.exports = {
  create,
};
