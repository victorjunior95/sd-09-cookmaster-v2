const connection = require('./connection');

const createUser = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then((result) => result.ops[0]);

const findUser = async (email) => 
  connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createUser,
  findUser,
};