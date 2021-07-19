const connection = require('./connection');

const create = async ({ name, ingredients, preparation, userId }) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .insertOne({
            name,
            ingredients,
            preparation,
            userId,
          }),
    )
);

const find = async (query) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .find(query).toArray(),
    )
);

const findOne = async (id) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .find(id).toArray(),
    )
);

module.exports = { create, find, findOne };
