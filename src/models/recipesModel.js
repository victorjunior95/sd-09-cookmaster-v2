const { ObjectID } = require('mongodb');
const connection = require('./connections');

const createRecipe = async (recipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe));

  return { ...recipe, _id: insertedId };
};

const getAll = () => (connection()
    .then((db) => db.collection('recipes').find().toArray()));

const getById = (id) => {
  if (!ObjectID.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectID(id) }));
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
