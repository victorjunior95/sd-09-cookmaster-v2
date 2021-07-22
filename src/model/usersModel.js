const { ObjectID } = require('mongodb');
const connection = require('./connection');

const collection = 'users';
const getAll = async () => (
  connection()
    .then((db) => db.collection(collection).find().toArray())
);

const findById = async (id) => (
  connection()
    .then((db) => db.collection(collection).findOne({ id }))
);

const findByEmail = async (email) => (
  connection()
    .then((db) => db.collection(collection).findOne({ email }))
);

const create = async (user) => (
  connection()
    .then((db) => db.collection(collection).insertOne(user))
);

const update = async (id, user) => (
  connection()
    .then((db) => db.collection(collection).updateOne({ _id: ObjectID(id) }, { user }))
);

const remove = async (id) => (
  connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectID(id) }))
);

module.exports = {
  create,
  getAll,
  findById,
  findByEmail,
  update,
  remove,
};
