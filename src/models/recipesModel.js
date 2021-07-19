const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, preparation, ingredients, userId }) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const { insertedId } = await recipesCollection
  .insertOne({ name, preparation, ingredients, userId });

  return {
    id: insertedId,
  };
};

const getAll = async () => {
  const recipes = connection()
    .then((db) => db.collection('recipes').find().toArray());
    return recipes;
};

const getById = async (id) => {
  const recipes = connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
    return recipes;
};

const update = async (name, ingredients, preparation, id) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));

  await recipesCollection
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation };
};

module.exports = {
    create,
    getAll,
    getById,
    update,
  }; 