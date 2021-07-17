const connection = require('./connection');

const create = async (recipe, userId) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne({ ...recipe, userId });
  return { recipe: result.ops[0] };
};

module.exports = {
  create,
};
