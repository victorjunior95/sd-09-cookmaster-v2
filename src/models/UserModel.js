const connection = require('./connection');

const create = async (data) => connection()
  .then((db) => db.collection('users').insertOne({ ...data, role: 'user' }))
  .then(({ insertedId }) => ({
    _id: insertedId,
    name: data.name,
    email: data.email,
    role: 'user',
  }));

  const getByEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((data) => data);

  module.exports = {
    create,
    getByEmail,
  };
