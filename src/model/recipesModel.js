const { ObjectID } = require('mongodb');
const connection = require('./connection');

const collection = 'recipes';
const getAll = async () => (
  connection()
    .then((db) => db.collection(collection).find().toArray())
);

const findById = async (id) => (
  connection()
    .then((db) => db.collection(collection).findOne({ _id: ObjectID(id) }))
);

const create = async (recipe) => (
  connection()
    .then((db) => db.collection(collection).insertOne(recipe))
);

const update = async (id, recipe) => (
  connection()
    .then((db) => db.collection(collection).updateOne({ _id: ObjectID(id) }, { $set: { recipe } }))
);

const remove = async (id) => (
  connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectID(id) }))
);

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
