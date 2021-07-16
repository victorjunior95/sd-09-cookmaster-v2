const { ObjectId } = require('mongodb');
const connection = require('./connection');

const usersCollection = 'users';

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection(usersCollection).findOne({ _id: ObjectId(id) }));
};

const createUser = async (user) => {
  return connection()
    .then((db) => db.collection(usersCollection).insertOne(user))
    .then((result) => getById(result.insertedId));
};

const getByEmail = async (email) => {
  return connection()
    .then((db) => db.collection(usersCollection).findOne({ email }));
};

const getByName = async (name) => {
  return connection()
    .then((db) => db.collection(usersCollection).findOne({ name }));
};

module.exports = {
  createUser,
  getByEmail,
  getById,
  getByName,
};
