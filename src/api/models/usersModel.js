const connection = require('./connection');

const createUser = async (name, email, password) => 
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));

const findUserByEmail = async (email) => {
  connection()
  .then((db) => db.collection('users').findOne({ email }));
};

module.exports = {
  createUser,
  findUserByEmail,
};