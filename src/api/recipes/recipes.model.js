const connection = require('../connection');

const addRecipe = async (newRecipe) => {
  const db = await connection();

  const { ops } = await db.collection('recipes').insertOne(newRecipe);

  return ops[0];
};

module.exports = {
  addRecipe,
};
