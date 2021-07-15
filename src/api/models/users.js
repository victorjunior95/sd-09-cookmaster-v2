const connection = require('./connection');

const create = async ({ name, email, password, role }) => {
  await connection()
    .then(
      (db) => db
        .collection('users')
          .insertOne({
            name,
            email,
            password,
            role,
          }),
    );
};

module.exports = { create };
