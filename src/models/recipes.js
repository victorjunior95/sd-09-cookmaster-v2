const { ObjectId } = require('mongodb');
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

const listById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const listRecipe = await connection().then((db) =>
    db.collection('recipes').findOne(new ObjectId(id)));

  return listRecipe;
};

module.exports = {
  create,
  list,
  listById,
};
