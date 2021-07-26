const connection = require('./connection');

const create = (data) => connection()
  .then((db) => db.collection('users').insertOne({ ...data, role: 'user' }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    name: data.name,
    email: data.email,
    role: 'user',
  }));

const getByEmail = (email) => connection()
  .then((db) => db.collection('users').findOne({ email }))
  .then((result) => result);

const auth = (data) => connection()
  .then((db) => db.collection('users').findOne(data))
  .then((result) => result);

const createAdmin = (data) => connection()
  .then((db) => db.collection('users').insertOne({ ...data, role: 'admin' }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    name: data.name,
    email: data.email,
    role: 'admin',
  }));

module.exports = {
  create,
  getByEmail,
  auth,
  createAdmin,
};
