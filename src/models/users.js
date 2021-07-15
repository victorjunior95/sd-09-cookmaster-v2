const connection = require('./connection');

const getUser = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const createUser = async (name, email, password, role) => connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => result.ops[0]);

module.exports = {
  getUser,
  createUser,
};
