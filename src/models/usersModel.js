const connection = require('./connection');

const registerUser = async (user) => {
  return connection()
    .then((db) => db.collection('users').insertOne(user))
    .then((result) => result.ops[0]);
};

const findUserByEmail = async (email) => {
  return connection()
  .then((db) => db.collection('users').findOne({ email }));
};

module.exports = {
  registerUser,
  findUserByEmail,
};
