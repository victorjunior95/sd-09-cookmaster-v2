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
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));

  const recipes = await recipesCollection.find().toArray();

  return recipes;
};

const getById = async (id) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const recipe = await recipesCollection.findOne(new ObjectId(id));
  return recipe;
};

const updateById = async (id, name, ingredients, preparation) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));

  await recipesCollection
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation };
};

const postImage = async (id, image) => {
  const recipesCollection = await connection()
  .then((db) => db.collection('recipes'));
  await recipesCollection.updateOne({ _id: ObjectId(id) }, 
  { $set: { image: `localhost:3000/src/uploads/${image}` } });
  const recipe = await recipesCollection.findOne(new ObjectId(id));
  return recipe;
};

const deleteById = async (id) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));

  const result = await recipesCollection
    .deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  postImage,
};