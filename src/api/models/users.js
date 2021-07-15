const connection = require('./connection');

const create = async ({ name, email, password, role }) => (
  connection()
    .then(
      (db) => db
        .collection('users')
          .insertOne({
            name,
            email,
            password,
            role,
          }),
    )
);

const findByEmail = async (email) => (
  connection()
    .then(
      (db) => db
        .collection('users')
          .findOne({ email }),
    )
);

module.exports = { create, findByEmail };
