const conn = require('./connection');
const response = require('../helpers/response');

const findUserByEmail = async (email) => {
  const usersCollection = await conn()
  .then((db) => db.collection('users'));

  const result = await usersCollection
    .findOne({ email });

  return result;
};

const signIn = async (name, email, password, role) => {
  const usersCollection = await conn()
    .then((db) => db.collection('users'));

  const { insertedId } = await usersCollection
    .insertOne({ name, email, password, role });

  if (!insertedId) return response(500, 'Internal server error');

  return {
    status: 201,
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

module.exports = {
  signIn,
  findUserByEmail,
};
