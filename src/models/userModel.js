const connection = require('./connection');

const create = async ({ name, email, password, role }) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const { insertedId } = await usersCollection.insertOne({ name, email, password, role });

  return {
    id: insertedId,
  };
};

const getUserByEmail = async (email) => {
  const usersCollection = await connection()
    .then((db) => db.collection('users'));
  const response = await usersCollection
    .find({ email }).toArray();
  return response;
};

module.exports = {
    create,
    getUserByEmail,
  }; 