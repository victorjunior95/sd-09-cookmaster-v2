const connection = require('./connection');

const collection = 'users';

// const findById = async (id) => (
//   connection()
//     .then((db) => db.collection(collection).findOne({ id }))
// );

const findByEmail = async (email) => (
  connection()
    .then((db) => db.collection(collection).findOne({ email }))
);

const create = async (user) => (
  connection()
    .then((db) => db.collection(collection).insertOne(user))
);

module.exports = {
  create,
  findByEmail,
};
