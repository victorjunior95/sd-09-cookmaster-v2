const connection = require('./connection');

const create = async (name, email, password, role) => {
  const usersCollection = await connection()
  .then((db) => db.collection('users'));

  const { ops } = await usersCollection.insertOne({ name, email, password, role });

  return ops[0];
};

const isEmailRegistered = async (email) => {
  const usersCollection = await connection()
  .then((db) => db.collection('users'));

  const response = await usersCollection.findOne({ email });
  
  return response;
};

module.exports = {
  create,
  isEmailRegistered,
};