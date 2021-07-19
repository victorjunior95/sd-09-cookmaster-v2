const connection = require('../connection/connection');

const registerUser = async (name, email, password) => {
  const user = await connection()
  .then((db) => db.collection('users').insertOne({ name, email, password }));

  return {
    _id: user.insertedId,
    name,
    email,
  };
};

const findEmail = async (email) => {
  await connection().then((db) => db.collection('users').findOne({ email }));
};

module.exports = { registerUser, findEmail };