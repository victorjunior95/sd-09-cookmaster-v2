const connection = require('./connections');

const create = async (recipesData) => {
  const createRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ ...recipesData }));

  return createRecipe.ops[0];
};

const list = async () => {
  const listRecipe = await connection().then((db) =>
    db.collection('recipes').find().toArray());

  return listRecipe;
};

module.exports = {
  create,
  list,
};
