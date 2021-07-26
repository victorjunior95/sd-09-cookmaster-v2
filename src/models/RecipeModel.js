const connection = require('./connection');

const create = (data, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ ...data, userId }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    ...data,
    userId,
  }));

const getAll = () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((result) => result);

const getById = (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: id }))
  .then((result) => result);

const edit = (_id, data, userId) => connection()
  .then((db) => db.collection('recipes').updateOne({ _id }, { $set: { ...data } }))
  .then(() => ({ _id, ...data, userId }));

module.exports = {
  create,
  getAll,
  getById,
  edit,
};
