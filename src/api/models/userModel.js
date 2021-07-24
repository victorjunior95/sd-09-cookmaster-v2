const connection = require('./connection');

const createUser = async ({ name, email, password, role }) => {
  const collection = await connection()
    .then((db) => db.collection('users'));

  const { insertedId } = await collection.insertOne({ name, email, password, role });

  return {
    id: insertedId,
  };
};

const getByEmail = async (email) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));

  const result = await usersCollection
    .find({ email }).toArray();

  return result;
};

const getUser = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createUser,
  getByEmail,
  getUser,
};