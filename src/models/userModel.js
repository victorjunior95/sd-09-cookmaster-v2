const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, email, password, role }) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const { insertedId } = await usersCollection.insertOne({ name, email, password, role });

  return {
    id: insertedId,
  };
};

const getByEmail = async (email) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const response = await usersCollection
    .find({ email }).toArray();
  if (response.length > 0) return true; 
  return false;
};

const getById = async (id) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const user = await usersCollection.findOne(new ObjectId(id));
  return user;
};

const getAll = async () => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));

  const users = await usersCollection.find().toArray();
  return users;
};

module.exports = {
  create,
  getByEmail,
  getById,
  getAll,
};