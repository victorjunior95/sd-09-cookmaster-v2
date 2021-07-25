const connection = require('./connections');

const create = async (recipesData) => {
  const createRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ ...recipesData }));

  return createRecipe.ops[0];
};

module.exports = {
  create,
};
