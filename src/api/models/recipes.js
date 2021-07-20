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

const updateOne = async (id, { name, ingredients, preparation }) => (
  connection()
    .then(
      (db) => db
        .collection('recipes')
          .updateOne(
            { _id: id },
            { $set: { name, ingredients, preparation } },
          ),
    )
);

module.exports = { create, find, findOne, updateOne };
