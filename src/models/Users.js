const connection = require('./connection');

const createUser = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then((result) => result.ops[0]);

const findUser = async (email, password) => {
  const query = password ? { email, password } : { email };
  return connection()
    .then((db) => db.collection('users').findOne(query));
};

const createNewAdmin = (name, email, password) => 
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'admin' }))
    .then((result) => result.ops[0]);

module.exports = {
  createUser,
  findUser,
  createNewAdmin,
};