const { ObjectID, ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (recipe) => {
  const { name, ingredients, preparation, userId } = recipe;
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);

  const { _id } = newRecipe;
  
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    },
  };
};

const edit = (id, recipe) => {
  const { name, ingredients, preparation, userId } = recipe;
 
  if (!ObjectID.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId } }))
    .then(() => ({ _id: id, name, ingredients, preparation, userId }));
};

const getAll = () => connection()
    .then((db) => db.collection('recipes').find().toArray());

const getById = (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
    .catch(() => null);
};
  
const remove = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const removed = await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    .catch(() => null);
  
  if (!removed) {
    return null;
  }

  return removed;
  };
  
module.exports = {
  create,
  edit,
  getAll,
  getById,
  remove,
};