const { ObjectId } = require('mongodb');
const connection = require('./connections');

const createRecipe = async (recipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe));

  return { ...recipe, _id: insertedId };
};

const getAll = () => (connection()
    .then((db) => db.collection('recipes').find().toArray()));

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const update = (id, updatedRecipe) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: updatedRecipe }));
};

const deleteRecipe = (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const addImageToRecipe = (id, imgPath) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image: imgPath } }));
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  update,
  deleteRecipe,
  addImageToRecipe,
};
