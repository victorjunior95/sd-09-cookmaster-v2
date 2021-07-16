const { ObjectId } = require('mongodb');
const connection = require('./connection');

const usersCollection = 'users';

async function getById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection(usersCollection).findOne({ _id: ObjectId(id) }));
}

async function createUser(user) {
  return connection()
    .then((db) => db.collection(usersCollection).insertOne(user))
    .then((result) => getById(result.insertedId));
}

async function getByEmail(email) {
  return connection()
    .then((db) => db.collection(usersCollection).findOne({ email }));
}

async function getByName(name) {
  return connection()
    .then((db) => db.collection(usersCollection).findOne({ name }));
}

module.exports = {
  createUser,
  getByEmail,
  getById,
  getByName,
};
