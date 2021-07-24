const connection = require('./connection');

const create = (data, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ ...data, userId }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    ...data,
    userId,
  }));

module.exports = {
  create,
};
